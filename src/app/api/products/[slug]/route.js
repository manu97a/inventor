import Product from "../../../../../models/Product";
import databaseConnection from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(req, { params }) {
  const { slug } = params;
  console.log("Product ID ", slug);
  await databaseConnection();
  try {
    const SingleProduct = await Product.findById(slug).lean();
    return NextResponse.json(SingleProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  const { slug } = params;
  console.log("Product ID TO DELETE: ", slug);
  try {
    await databaseConnection();
    await Product.deleteOne({ _id: slug }).lean();
    return NextResponse.json("Product deleted succesfully");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete this Product");
  }
}

export async function PATCH(req, { params }) {
  const { slug } = params;
  const updatedProduct = await req.json();
  console.log("Product ID TO DELETE: ", slug);
  await databaseConnection();
  const singleProductEdit = await Product.findByIdAndUpdate(
    { _id: slug },
    updatedProduct,
    {
      new: true,
    }
  );
  return NextResponse.json({
    message: "Product information updated succesfully",
    singleProductEdit
  })
}
