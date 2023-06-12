import Product from "../model/Product";


export const CreateProduct = async(req, res) => {
  const { title, price, desc, img,category } = req.body;
  const post = await new Product ({
    title,
    desc,
    price,
    img,
    category
  });
  try {
    const data = await post.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const AllProduct =async(req,res) =>{
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

 export const SingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const searchProduct =async(req,res)=>{
  try {
    const data = await Product({
      "$or":[
        {title:{$regex:req.params.key}}
    ]
    })
    res.status(201).json(data)
  } catch (error) {
    res.status(401).json({message:error.message})
  }
}