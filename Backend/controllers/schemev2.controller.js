import Schemev2 from "../models/schemev2.model.js";

const getAllSchemes = async (req, res) => {
    try {
        const schemes = await Schemev2.find();
        res.status(200).json(schemes);
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
        const schemes = await Schemev2.find({ schemeCategory: req.params.category });
        res.status(200).json(schemes);
    } catch (error) {
        res.status(404).json({ message: "Category not found" });
    }
};



const getFilteredSchemes = async (req, res) => {
    try {
        // Destructure filters from req.query
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
            filter.Category = { $in: categoriesArray };
        }

        // Filter by tags (assuming it's an array of tags)
        if (tags) {
            const tagsArray = tags.split(','); // assuming tags are passed as a comma-separated string
            filter.tags = { $in: tagsArray };
        }

        // Filter by schemeName (case-insensitive)
        if (schemeName) {
            filter.schemeName = { $regex: schemeName, $options: 'i' }; // Case-insensitive match
        }

        // Query the database with the filter object
        const schemes = await Schemev2.find(filter);

        // Return the filtered schemes
        res.status(200).json(schemes);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Error retrieving filtered schemes", error: err });
    }
};





export { getAllSchemes, getSchemeById, getSchemeByCategory, getFilteredSchemes };