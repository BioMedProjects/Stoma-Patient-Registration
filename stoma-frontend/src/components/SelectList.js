import React from 'react'

export function SelectList({ results, images, selectedDoc, handleSelectDoc }) {
 return (
  <div className="mt-6 bg-neutral-200 xl:w-1/3 border-2 rounded-lg border-yellow-500 pb-6">
   <h3 className="py-4 text-center text-left text-xl font-semibold text-neutral-600 border-b-2 border-yellow-500">
    Wybierz lekarza
   </h3>
   {results.map((result, index) => {
    return (
     <div className={`flex gap-6 items-center p-2 hover:bg-yellow-400 ${selectedDoc === index ? 'bg-neutral-300 font-semibold' : ''}`} key={result.last_name} onClick={() => handleSelectDoc(index)}>
      <img className="object-cover rounded-full h-12 w-12 shadow-lg border-2" src={images[index].picture.thumbnail} alt="avatar" />
      <p>{result.first_name + ' ' + result.last_name}</p>
     </div>
    )
   })}
  </div>
 )
}
