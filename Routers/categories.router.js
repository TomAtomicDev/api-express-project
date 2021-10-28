const express = require ('express');
const faker= require('faker');
faker.locale='es_MX';

const router= express.Router();

router.get('/', (req, res)=>{
  let categ=[];
  for (let index = 0; index < 7; index++) {
    categ.push({
      name: faker.commerce.department()
    })

  }
  res.json(categ)
});

module.exports = router;
