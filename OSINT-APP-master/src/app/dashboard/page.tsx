"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [busquedaNum, setBusquedaNum] = useState("");
  const [searchTelefonoResults, setTelefonoResults] = useState([]);
  const [busquedaIp, setBusquedaIp] = useState("");
  const [searchIpResults, setSearchIpResults] = useState([]);
  
  const handleSearch = async () => {
    if (!searchQuery && !busquedaNum && !busquedaIp) return;
  
    // Mostrar la alerta de "Cargando"
    Swal.fire({
      title: "Cargando",
      html: "Estamos buscando la información...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      if (searchQuery) {
        const response = await fetch(`/api/domains/search?domain=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.domains || []);
      }
  
      if (busquedaNum) {
        const response1 = await fetch(
          `https://api.veriphone.io/v2/verify?phone=${encodeURIComponent(
            busquedaNum
          )}&key=1172E7C38C6C4E9286EBA959073621A8`
        );
        const data1 = await response1.json();
        setTelefonoResults([data1] || []);
      }
  
      if (busquedaIp) {
        const response2 = await fetch(`https://api.facha.dev/v1/ip/${busquedaIp}`);
        const data2 = await response2.json();
        setSearchIpResults([data2] || []);
      }
  
      // Cerrar la alerta de "Cargando" y mostrar la alerta de "Éxito"
      Swal.fire({
        icon: "success",
        title: "¡Búsqueda exitosa!",
        text: "Los datos han sido cargados correctamente.",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // En caso de error, mostrar una alerta de error
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un error al cargar los datos.",
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Dashboard ChismOSINT
        </h1>
        <p className="text-gray-700 text-center">
          Ingresa el dominio principal de la empresa que deseas investigar.
        </p>
        <div className="relative mt-4">
          <label htmlFor="Search" className="sr-only">
            Buscar empresa
          </label>
          <input
            type="text"
            id="Search"
            placeholder="Buscar empresa..."
            className="pl-4 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-700"
              onClick={handleSearch}
            >
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>

        <div className="mt-4 relative">
          <label
            htmlFor="busqueda_num"
            className="text-sm font-medium text-gray-700"
          >
            Número de búsqueda
          </label>
          <input
            type="text"
            id="busqueda_num"
            placeholder="Buscar numero..."
            className="pl-4 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm text-black mt-1"
            value={busquedaNum}
            onChange={(e) => setBusquedaNum(e.target.value)}
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-700"
              onClick={handleSearch}
            >
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>


        <div className="mt-4 relative">
  <label htmlFor="busqueda_ip" className="text-sm font-medium text-gray-700">
    Dirección IP
  </label>
  <input
    type="text"
    id="busqueda_ip"
    placeholder="Buscar IP..."
    className="pl-4 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm text-black mt-1"
    value={busquedaIp}
    onChange={(e) => setBusquedaIp(e.target.value)}
  />

  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
    <button
      type="button"
      className="text-gray-600 hover:text-gray-700"
      onClick={handleSearch}
    >
      <span className="sr-only">Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </span>
</div>





        

        <div className="mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # Activo
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Activo
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategoría
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre Activo
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción Activo
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valoración
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Servicios
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dominio
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.domain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.create_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    N/A
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="mt-8 min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # ACTIVO
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Válido
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  País
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prefijo
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrier
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchTelefonoResults.map((result1, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result1.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    YES
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result1.phone_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result1.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result1.country_prefix}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result1.carrier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="mt-8 min-w-full divide-y divide-gray-200">
            <thead>
              
              <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # ACTIVO
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  subnet
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  pais
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  nombre
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  numero asn
                </th>
                ww
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchIpResults.map((result2, index) => (
                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result2.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result2.subnet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result2.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result2.asn.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result2.asn.number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
