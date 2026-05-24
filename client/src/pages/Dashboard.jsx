import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeads(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchLeads();

  }, []);

  // ADD LEAD

  const addLead = async () => {

    if (!company || !client || !status) {

      alert("Please Fill All Fields");

      return;
    }

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/leads",
        {
          company,
          client,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lead Added Successfully");

      fetchLeads();

      setCompany("");
      setClient("");
      setStatus("");

    } catch (error) {

      console.log(error);

      alert("Failed To Add Lead");
    }
  };

  // DELETE LEAD

  const deleteLead = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Lead Deleted");

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  // EDIT LEAD

  const editLead = async (id) => {

    const newStatus = prompt("Enter New Status");

    if (!newStatus) return;

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/leads/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lead Updated");

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // SEARCH FILTER

  const filteredLeads = leads.filter((lead) =>
    lead.company
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-slate-900 text-white flex">

      {/* SIDEBAR */}

      <div className="w-64 bg-slate-800 p-6">

        <h1 className="text-4xl font-bold text-blue-400 mb-10">
          LeadFlow CRM
        </h1>

        <ul className="space-y-6 text-lg">
          <li onClick={() => navigate("/dashboard")}
          className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </li>

          <li onClick={() => {
            document.getElementById("leads-section") ?.scrollIntoView({
            behavior: "smooth",
            });
         }}
         className="hover:text-blue-400 cursor-pointer">
          Leads
   </li>

         <li onClick={() => navigate("/analytics")}
         className="hover:text-blue-400 cursor-pointer">
            Analytics
         </li>

         <li className="hover:text-blue-400 cursor-pointer">
               Settings
         </li>

        </ul>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-8">

        {/* TOP BAR */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-5xl font-bold">
            Dashboard
          </h2>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* SEARCH */}

        <div className="bg-slate-800 p-4 rounded-xl mb-8 flex items-center gap-3">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full"
          />

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

            <p className="text-gray-400">
              Total Leads
            </p>

            <h1 className="text-5xl font-bold mt-2">
              {leads.length}
            </h1>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

            <p className="text-gray-400">
              Completed
            </p>

            <h1 className="text-5xl font-bold text-green-400 mt-2">

              {
                leads.filter(
                  (lead) => lead.status === "Completed"
                ).length
              }

            </h1>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

            <p className="text-gray-400">
              Revenue
            </p>

            <h1 className="text-5xl font-bold text-blue-400 mt-2">
              ₹{leads.length * 5000}
            </h1>

          </div>

        </div>

        {/* ADD LEAD */}

        <div className="bg-slate-800 p-6 rounded-2xl mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Add New Lead
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-slate-700 p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              placeholder="Client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="bg-slate-700 p-3 rounded-lg outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-700 p-3 rounded-lg outline-none"
            >

              <option value="">
                Select Status
              </option>

              <option value="New">
                New
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          <button
            onClick={addLead}
            className="mt-6 bg-blue-500 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600"
          >
            <FaPlus />
            Add Lead
          </button>

        </div>

        {/* LEAD TABLE */}

        <div id="leads-section" className="bg-slate-800 p-6 rounded-2xl"
>

          <h2 className="text-3xl font-bold mb-6">
            Lead List
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700 text-left text-gray-400">

                <th className="py-3">Company</th>

                <th>Client</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.map((lead) => (

                <tr
                  key={lead._id}
                  className="border-b border-slate-700 hover:bg-slate-700"
                >

                  <td className="py-4">
                    {lead.company}
                  </td>

                  <td>
                    {lead.client}
                  </td>

                  <td>

                    <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                      {lead.status}
                    </span>

                  </td>

                  <td className="flex gap-3 py-4">

                    <button
                      onClick={() => editLead(lead._id)}
                      className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="bg-red-500 p-2 rounded-lg hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>

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