import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";
export async function GET() {
  await databaseConnection();
  const productos = await Product.find();

  return NextResponse.json(productos);
}
export async function POST(req) {
  await databaseConnection();
  try {
    const data = await req.json();
    const singleProduct = new Product(data);
    await singleProduct.save();
    return NextResponse.json({
      message: "Product created succesfully",
      singleProduct,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
