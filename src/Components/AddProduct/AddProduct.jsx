import React, { useEffect, useRef, useState } from 'react'
import { useShopContext } from '../../Context/ShopContext'
import { Formik, Form, Field } from 'formik';
import FormError from './ErrorMessage/ErrorMessage'
import * as Yup from 'yup';

const AddProduct = () => {

  const fileInputRef = useRef(null);
  const { addProduct } = useShopContext();
  const [preview, setPreview] = useState([]);

// useEffect(()=>{
// console.log('preview=> ', JSON.stringify(preview))
// },[preview])

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),

    category: Yup.string()
      .required('Category is required'),

    image: Yup.array()
      .min(1, 'At least 1 image is required'),
  //   image: Yup.string()
  // .required('Image is required'),

    new_price: Yup.number()
      .required('New price is required'),

    old_price: Yup.number()
      .required('Old price is required'),
  });
    
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          image: [],
          category: "",
          new_price: "",
          old_price: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {

          const newProduct = {
            ...values,
            id: Date.now(), // auto id
            new_price: Number(values.new_price),
            old_price: Number(values.old_price)
          };

          addProduct(newProduct);
          resetForm();
          setPreview([]);
          fileInputRef.current.value = "";
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <h1>Add Product</h1>

            <div>
              <Field type="text" name="name" placeholder="Product Name" />
              <FormError name="name"/>
              {/* <Error
                Message name="name" component="div" /> */}
            </div>

            <div>
              <Field type="text" name="category" placeholder="Category" />
              <FormError name="category"/>
              {/* <ErrorMessage name="category" component="div" /> */}
            </div>

            <div>
              <Field type="number" name="old_price" placeholder="Old Price" />
              <FormError name="old_price"/>
              {/* <ErrorMessage name="old_price" component="div" /> */}
            </div>

            <div>
              <Field type="number" name="new_price" placeholder="New Price" />
              <FormError name="new_price"/>
              {/* <ErrorMessage name="new_price" component="div" /> */}
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
               onChange={(event) => {
                  const files = Array.from(event.target.files);
                  if (files.length === 0) return;
                  const base64Images = [];

                  files.forEach((file) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                      base64Images.push(reader.result);

                      // When all files are processed
                      if (base64Images.length === files.length) {
                        setFieldValue("image", base64Images);
                        setPreview(base64Images);
                      }
                    };

                    reader.readAsDataURL(file);
                  });
                }}
              />
              <FormError name="image"/>
              {/* <ErrorMessage name="image" component="div" /> */}
            </div>

            {preview.length > 0 && (
              <div>
                {preview.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt="preview" width="100" />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedPreview = preview.filter((_, i) => i !== index);

                        setPreview(updatedPreview);
                        setFieldValue("image", updatedPreview);

                        if (updatedPreview.length === 0) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button type="submit">Add Product</button>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddProduct;
