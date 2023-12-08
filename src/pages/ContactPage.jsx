import React from 'react'

const ContactPage = () => {
  return (
    <div className='fluid-container '>
      <div className='px-6 text-center mx-auto max-w-xl'>
        <h1 className='mb-4'>Contacto</h1>
        <h4 className='text-lg'>¿Tenés alguna duda? ¿Querés hacer un pedido especial? <br/> ¡Escribinos!</h4>
      </div>
      <form className='max-w-3xl text-left mx-auto my-10'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-nowrap flex-col md:flex-row gap-2 w-full'>
            <div className='flex flex-col gap-1 w-full'>
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" id="name" placeholder='Nombre' className='p-2 rounded-md' />
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder='Email' className='p-2 rounded-md' />
            </div>
          </div>
          <div className='flex flex-col gap-1 w-full'>
              <label htmlFor="tel">Telefono</label>
              <input type="tel" name="tel" id="tel" placeholder='Telefono' className='p-2 rounded-md' />
            </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="message">Mensaje</label>
            <textarea  name="message" id="message" placeholder='Mensaje' rows='4' className='p-2 rounded-md' />
          </div>
          <div className='flex justify-end mt-4'>
            <button className='max-w-xs w-full bg-white bg-opacity-50 text-black text-lg'>Enviar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactPage