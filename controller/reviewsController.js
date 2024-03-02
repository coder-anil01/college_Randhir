import reviewsModel from "../model/reviewsModel.js";

export const createReviews = async(req, res) => {
    const {name, profileImg, message, star} = req.body;
    try {
        await new reviewsModel({name, profileImg, message, star}).save();
        res.status(200).send({
            success: true,
            message: "Thanks for the review!",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

export const getPublishReviews = async(req, res) => {
    try {
        const reviews = await reviewsModel.find({publish: true}).sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            reviews,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}





//****************************/ ADMIN /*************************************//
export const updateReviews = async(req, res) => {
    const {id, publish} = req.body;
    try {
        await reviewsModel.findByIdAndUpdate(id, {publish});
        const reviews = await reviewsModel.find({}).sort({ createdAt: -1});
        if(publish){
            res.status(200).send({
                success: true,
                message: "Review Is Published",
                reviews,
            });
        }else{
            res.status(200).send({
                success: true,
                message: "Review Is Private",
                reviews,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

export const getReviews = async(req, res) => {
    try {
        const reviews = await reviewsModel.find({}).sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            reviews,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}