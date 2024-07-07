import * as React from 'react';

const people = [
    {
      name: 'Gorky Palacios',
      role: 'Ingeniero de Software',
      imageUrl:
        'https://i.ibb.co/BNrkj30/gorky.png',
    },
    {
        name: 'Liseth Abad',
        role: 'Ingeniera de Software',
        imageUrl:
          'https://i.ibb.co/xzQ1f56/Lis2.png',
      },
      {
        name: 'Nicolás García',
        role: 'Ingeniero de Software',
        imageUrl:
          'https://i.ibb.co/XX997nR/rusky.png',
      }
        
    
  ]

const TeamSection = () => {
    return ( 
        <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Conoce a nuestro equipo</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lis, Nico y Gorky, estudiantes de la Universidad de las Américas son los desarrolladores de esta app.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
     );
}
 
export default TeamSection;