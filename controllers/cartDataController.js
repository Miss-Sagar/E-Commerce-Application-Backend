const asyncHandler = require("express-async-handler");
const CartData = require('../models/cartDataModel');

//@desc Store all carted items
//@route POST /cartData/:id
//@access private

const cartItem = asyncHandler(async (req, res) => {
    try {
        const { itemId, category, price } = req.body;

        // Check if the cart item already exists
        const existingCartItem = await CartData.findOne({itemId: req.user.id});

        if (!existingCartItem) {
            // If the cart item does not exist, create a new one
            CartData.create({
                itemId,
                category,
                price,
                userId: req.user.id
            })
                .then((newCartItem) => {
                    res.status(201).json({ message: "Item added to the cart successfully", cartItem: newCartItem });
                })
                .catch((err) => {
                    console.error("Error creating item:", err);
                    res.status(500).json({ message: "Internal server error" });
                });
        } else {
            // If the cart item exists, update its information
            const updatedCartItem = await CartData.findOneAndUpdate(
                { itemId: itemId },
                { $set: { category: category }, $inc: { quantity: 1 }  },
                // { $set: { quantity: CartData.quantity + 1 } },
                { new: true, upsert: true }
            );

            if (updatedCartItem) {
                // Document was found and updated
                console.log("Item updated successfully:", updatedCartItem);
                res.status(200).json({ message: "Item updated successfully", updatedCartItem });
            } else {
                // Document with the given itemId doesn't exist (unlikely in this case)
                console.log("Item not found. You may want to handle this case.");
                res.status(404).json({ message: "Item not found" });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// @desc Get all carted items of particular user
// @route GET /getCartProducts
// @access private
const userCartedData = asyncHandler(async(req, res) => {
    const cartedItems = await CartData.find({ userId: req.user.id });
    res.status(200).json(cartedItems);
});

//@desc delete the particular carted item
//@route DELETE /removeCartItem/:id
//@access public

const deleteCartItem = asyncHandler(async (req, res) => {
    try {
        const deleteItem = await CartData.findById(req.params.id); //id is object id
        console.log("deleteItem", deleteItem);
        if (!deleteItem) {
            res.status(404).json({ message: "Item not found" });
            return;
        }

        await deleteItem.deleteOne();
        res.status(200).json({ message: "Cart Item Removed Successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {cartItem, userCartedData, deleteCartItem};
