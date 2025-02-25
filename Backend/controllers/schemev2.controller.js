import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";

const getAllSchemes = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const schemes = await Schemev2.paginate({}, options);
        res.status(200).json({
            schemes: schemes.docs,
            totalPages: schemes.totalPages,
            currentPage: schemes.page,
            totalSchemes: schemes.totalDocs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSchemeById = async (req, res) => {
    try {
        const scheme = await Schemev2.findById(req.params.id);
        res.status(200).json(scheme);
    }
    catch (error) {
        res.status(404).json({ message: "Scheme not found" });
    }
};

const getSchemeByCategory = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const schemes = await Schemev2.paginate(
            { schemeCategory: req.params.category },
            options
        );
        res.status(200).json({
            schemes: schemes.docs,
            totalPages: schemes.totalPages,
            currentPage: schemes.page,
            totalSchemes: schemes.totalDocs
        });
    } catch (error) {
        res.status(404).json({ message: "Category not found" });
    }
};

const getFilteredSchemes = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const {
            search, openDate, closeDate, state, nodalMinistryName, level,
            category, tags, schemeName
        } = req.query;

        // Prepare the filter object
        const filter = {};

        // Apply search filter to multiple fields
        if (search) {
            const searchConditions = [];

            // Check if search term is in 'state' (exact match)
            searchConditions.push({ state: { $eq: search } });

            // Check if search term is in 'nodalMinistryName' (partial match using regex)
            searchConditions.push({ nodalMinistryName: { $regex: search, $options: 'i' } });

            // Check if search term is in 'schemeName' (partial match using regex)
            searchConditions.push({ schemeName: { $regex: search, $options: 'i' } });

            // Check if search term is in 'tags' array (exact match)
            searchConditions.push({ tags: { $in: [search] } });

            // Check if search term is in 'level' (exact match)
            searchConditions.push({ level: { $eq: search } });

            // Check if search term is in 'Category' array (partial match using regex)
            searchConditions.push({ Category: { $regex: search, $options: 'i' } });

            // Check if search term is in 'detailedDescription_md' (partial match)
            searchConditions.push({ detailedDescription_md: { $regex: search, $options: 'i' } });  // Case-insensitive

            // Combine all the conditions using $or
            filter.$or = searchConditions;
        }

        // Handle date range filters for openDate and closeDate
        if (openDate || closeDate) {
            const dateConditions = [];

            if (openDate) {
                dateConditions.push({ openDate: { $gte: new Date(openDate) } });
            }

            if (closeDate) {
                dateConditions.push({ closeDate: { $lte: new Date(closeDate) } });
            }

            // Add conditions where openDate or closeDate are null
            dateConditions.push({ openDate: { $eq: null } });
            dateConditions.push({ closeDate: { $eq: null } });

            filter.$or = dateConditions;
        }

        // Filter by state
        if (state) {
            filter.state = state;
        }

        // Filter by nodalMinistryName
        if (nodalMinistryName) {
            filter.nodalMinistryName = nodalMinistryName;
        }

        // Filter by level
        if (level) {
            filter.level = level;
        }

        // Filter by category (assuming it's an array of categories)
        if (category) {
            const categoriesArray = category.split(','); // assuming categories are passed as a comma-separated string
            filter.category = { $in: categoriesArray };
        }

        // Filter by tags (assuming it's an array of tags)
        if (tags) {
            const tagsArray = tags.split(','); // assuming tags are passed as a comma-separated string
            filter.tags = { $in: tagsArray };
        }

        // Filter by schemeName (case-insensitive)
        if (schemeName) {
            filter.$or = filter.$or || []; // Ensure the $or array exists

            // Case-insensitive match for schemeName
            filter.$or.push({ schemeName: { $regex: schemeName, $options: 'i' } });

            // Case-insensitive match for schemeShortTitle
            filter.$or.push({ schemeShortTitle: { $regex: schemeName, $options: 'i' } });
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const schemes = await Schemev2.paginate(filter, options);
        res.status(200).json({
            schemes: schemes.docs,
            totalPages: schemes.totalPages,
            currentPage: schemes.page,
            totalSchemes: schemes.totalDocs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving filtered schemes", error: err });
    }
};

// save favorite schemes

const saveFavoriteSchemes = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const userId = req.user._id;

        // Get the scheme IDs from the request body
        const schemeId = req.body.schemeId;

        // Find the user by ID and update the favorites array
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { favorites: schemeId } },
            { new: true }
        );

        // Return a success response
        res.status(200).json({ message: "Favorite schemes saved successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error saving favorite schemes:", error);
        res.status(500).json({ message: "Error saving favorite schemes" });
    }
};

const removeFavoriteSchemes = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; // Change to use params instead of body

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Scheme removed from favorites"
        });
    } catch (error) {
        console.error("Error removing favorite scheme:", error);
        res.status(500).json({
            success: false,
            message: "Error removing favorite scheme"
        });
    }
};

const getFavoriteSchemes = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const userId = req.user._id;

        // Find the user by ID and retrieve their favorite schemes
        const user = await User.findById(userId);

        // Return the user's favorite schemes
        res.status(200).json(user.favorites);
    } catch (error) {
        // Handle errors
        console.error("Error retrieving favorite schemes:", error);
        res.status(500).json({ message: "Error retrieving favorite schemes" });
    }
};

export { getAllSchemes, getSchemeById, getSchemeByCategory, getFilteredSchemes, saveFavoriteSchemes, removeFavoriteSchemes, getFavoriteSchemes };