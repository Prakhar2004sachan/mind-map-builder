import React from 'react'

function Button({label, icon, showIcon}) {
  return (
    <div className="bg-[#717171] flex gap-2 px-4 py-2 items-center rounded-lg cursor-pointer">
      {showIcon && icon}
      <p className='text-sm font-semibold'>{label}</p>
    </div>
  );
}

export default Button