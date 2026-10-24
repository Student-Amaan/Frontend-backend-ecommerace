import React from 'react'
import { useEffect, useState } from 'react'
import api from "../api/axios"
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    catagory: "",
    image: "",
    stock: "",
  });
  const allowedFields = ["title", "description", "price", "catagory", "image", "stock"]

  const loadProduct = async () => {
    const res = await api.get(`/products`)
    const product = res.data.find((p) => p._id === id);
    console.log(product)
    setForm(product)
  }

  useEffect(() => {
    loadProduct()
  }, [])

  const handleChange = (e) => {
    setForm ({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.put(`/products/update/${id}`, form)
    alert("Product updated sucessfully")
    navigate("/admin/products")
  }
  return (
    <div className=' max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded '>
      <h2 className='text-2xl font-bold mb-6 '>Edit Product</h2>
      <form onSubmit={handleSubmit} className='space-y-3'>
        {
          allowedFields.map((key) =>(
            allowedFields.includes(key) &&
            <input
             key={key}
             name = {key}
             value={form[key]}
             onChange={handleChange}
             placeholder={key}
             className='w-full p-2 border border-gray-300 rounded '            
            />
          ))}
        
        <button type='submit' className='w-full bg-blue-500 text-white rounded '>Update</button>
      </form>
    </div>
  )
}

export default EditProduct