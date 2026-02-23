import React, { useRef, useState } from 'react'
import { useShopContext } from '../../Context/ShopContext'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddProduct = () => {

  const fileInputRef = useRef(null);
  const { addProduct } = useShopContext();
  const [preview, setPreview] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),

    category: Yup.string()
      .required('Category is required'),

    image: Yup.array()
      .min(1, 'At least 1 image is required'),

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
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <Field type="text" name="category" placeholder="Category" />
              <ErrorMessage name="category" component="div" />
            </div>

            <div>
              <Field type="number" name="old_price" placeholder="Old Price" />
              <ErrorMessage name="old_price" component="div" />
            </div>

            <div>
              <Field type="number" name="new_price" placeholder="New Price" />
              <ErrorMessage name="new_price" component="div" />
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files);
                  setFieldValue("image", files);

                  const previewUrls = files.map(file =>
                    URL.createObjectURL(file)
                  );
                  setPreview(previewUrls);
                }}
              />
              <ErrorMessage name="image" component="div" />
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
                        const updatedFiles = preview.filter((_, i) => i !== index);

                        setPreview(updatedPreview);
                        setFieldValue("image", updatedFiles);

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
