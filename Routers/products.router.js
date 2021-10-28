const express = require('express');
const faker= require('faker');
faker.locale = "es_MX";

const router = express.Router();


router.get('/', (req, res) => {
    const products =[];
    for (let index = 0; index < 100; index++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl()
      })

    }
    res.json(products)
});

router.get('/:id', (req, res) => {
  const {id}=req.params;
  if (id=== '999'){
    res.status(404).json({
      message: '404 Not found'
    })
  } else {
  res.status(200).json([
    {
      id,
      name: 'Escritorio',
      price: 650
    }
  ])}
});

router.post('/', (req,res)=>{
  const body =req.body;
  res.status(201).json({
    message: 'El body de su post ha sido creado',
    data: body
  })
});

router.patch('/:id', (req,res)=>{
  const body =req.body;
  const {id}=req.params;
  res.json({
    message: 'El body de su patch ha sido actualizado',
    data: body,
    id,
  })
});

router.delete('/:id', (req,res)=>{
  const {id}=req.params;
  res.json({
    message: 'Se a borrado el objeto solicitado',
    id,
  })
});

module.exports = router;
