import React from 'react'
import Image from 'next/image'

const Ripple = () => {
  return (
    <div>
      <Image
      className='w-[200px] m-auto block'
      src='/images/ripple.gif'
      alt='loading..'
      width={20}
      height={20}
      />
    </div>
  )
}

export default Ripple
