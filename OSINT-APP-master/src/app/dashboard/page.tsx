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
  const [searchIpVirusTotalResults, setSearchIpVirusTotalResults] = useState(
    []
  );
  const [showDomainTable, setShowDomainTable] = useState(false);
  const [showPhoneTable, setShowPhoneTable] = useState(false);
  const [showIpTable, setShowIpTable] = useState(false);
  const clearResults = () => {
    setSearchResults([]);
    setTelefonoResults([]);
    setSearchIpResults([]);
    setSearchIpVirusTotalResults([]);
    setShowDomainTable(false);
    setShowPhoneTable(false);
    setShowIpTable(false);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-apikey":
        "9b6850b1516d8ce9d83bec1ccb891544c495ca1f01ba64c3d6083b1aaa71396b",
    },
  };
  const handleSearch = async () => {
    if (!searchQuery && !busquedaNum && !busquedaIp) {
      clearResults();
      return;
    }

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
        const response = await fetch(
          `/api/domains/search?domain=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.domains || []);
        setShowDomainTable(true);
      }

      if (busquedaNum) {
        const response1 = await fetch(
          `https://api.veriphone.io/v2/verify?phone=${encodeURIComponent(
            busquedaNum
          )}&key=1172E7C38C6C4E9286EBA959073621A8`
        );
        const data1 = await response1.json();
        setTelefonoResults([data1] || []);
        setShowPhoneTable(true);
      }

      if (busquedaIp) {
        const response2 = await fetch(
          `https://api.facha.dev/v1/ip/${busquedaIp}`
        );
        const response3 = await fetch(
          `https://www.virustotal.com/api/v3/ip_addresses/${busquedaIp}`,
          options
        );
        const data2 = await response2.json();
        const data3 = await response3.json();
        setSearchIpResults([data2] || []);
        setSearchIpVirusTotalResults([data3] || []);
        setShowIpTable(true);
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
        <div className="relative mt-4">
          <label htmlFor="Search" className="text-sm font-medium text-gray-700">
            Búsqueda por Dominio
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
            Búsqueda por número de teléfono
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
          <label
            htmlFor="busqueda_ip"
            className="text-sm font-medium text-gray-700"
          >
            Búsqueda por dirección IP
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
          {(showDomainTable || showPhoneTable || showIpTable) && (
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
                    Descripción
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valoración
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(() => {
                  let globalIndex = 1;

                  return (
                    <>
                      {showDomainTable &&
                        searchResults.map((result, index) => (
                          <tr key={`domain-${index}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {globalIndex++}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div><b>[S]</b></div>
                              <div>Servicios</div>
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
                              3
                            </td>
                          </tr>
                        ))}
                      {showPhoneTable &&
                        searchTelefonoResults.map((result1, index) => (
                          <tr key={`phone-${index}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {globalIndex++}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div> <b>[D]</b></div>
                              <div>Datos/Información</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {result1.phone_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {result1.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div><b>País:</b> {result1.country}</div>
                              <div><b>Prefijo:</b> +{result1.country_prefix}</div>
                              <div><b>Operadora:</b> {result1.carrier}</div>
                              <div><b>Teléfono Local:</b> {result1.local_number}</div>
                              <div>
                              <b>Estado:</b>
                                {result1.phone_valid ? "Activo" : "Inactivo"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              3
                            </td>
                          </tr>
                        ))}
{showIpTable &&
  searchIpResults.map((result2, index) => (
    <tr key={`ip-${index}`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {globalIndex++}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div><b>[arch]</b></div>
        <div>Arquitectura del Sistema</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        IP
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div>IP: {result2.ip}</div>
        <div>Subred: {result2.subnet}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div><b> País:</b>  {result2.country}</div>
        <div><b> Nombre ASN:</b>  {result2.asn.name}</div>
        <div ><b>ASN:</b> {result2.asn.number}</div>
        <div>--------------</div>
        <div><b>Nombres Alternativos:</b></div>
        <ul>
          {searchIpVirusTotalResults.map((result3, idx) => (
            <li key={`virus-${idx}`}>
              {result3.data.attributes.last_https_certificate.extensions.subject_alternative_name.map((name, idx) => (
                <div key={`alt-name-${idx}`}>
                  - {name}
                </div>
              ))}
            </li>
          ))}
        </ul>
        <div>--------------</div>
        <div><b>Resultados Análisis:</b></div>
        <ul>
          {searchIpVirusTotalResults.map((result3, idx) => (
            <li key={`virus-analysis-${idx}`}>
              <div>
                {Object.keys(result3.data.attributes.last_analysis_stats).map((key) => (
                  <div key={key}>
                    <strong>{key}: </strong>
                    {result3.data.attributes.last_analysis_stats[key]}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </td>
      <td>2</td>
    </tr>
  ))}

                    </>
                  );
                })()}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
