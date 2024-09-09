import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../app.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState('categories'); // Track the selected tab
  const [loading, setLoading] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false); // Manage add category form visibility
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null); // Use File object for image

  const [users, setUsers] = useState([]);
  
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user',
  });
  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);


  // Fetch all categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8003/api/category/all');
      console.log("API response : ",response);
      setCategories(response.data.data); // Assuming the data is in `response.data.data`
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  // Handle form submission to add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', newCategoryName);
    formData.append('image', newCategoryImage);

    try {
      const response = await axios.post('http://localhost:8003/api/category/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form fields
      setNewCategoryName('');
      setNewCategoryImage(null);
      setShowAddCategory(false);

      // Assuming the API returns the newly added category object
      const addedCategory = response.data.data; // Make sure your API returns the new category here
      if (addedCategory) {
        // Update the categories state without refetching all data
        setCategories((prevCategories) => [...prevCategories, addedCategory]);
      } else {
        // Optionally, handle unexpected response format
        console.error('Unexpected API response after adding category:', response.data);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8003/api/category/${categoryId}`);
      // Refresh categories list after deletion
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8004/api/user/');
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission to add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8004/api/user/register', newUser);
      setShowAddUser(false);
      setNewUser({
        email: '',
        username: '',
        password: '',
        role: 'user',
      });

      const response = await axios.get('http://localhost:8004/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8004/api/user/${userId}`);
      const response = await axios.get('http://localhost:8004/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  // Handle table rendering 
  const renderTable = () => {
    switch (selectedTab) {
      case 'categories':
        return (
          <div>
            <h2 className="text-xl mb-4 flex items-center justify-between">
              Categories
              <button
                onClick={() => setShowAddCategory(true)}
                className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add New Category
              </button>
            </h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <img src={category.image} alt={category.name} className="w-16 h-16 object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => console.log('Edit functionality pending')}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No categories found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {showAddCategory && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                  <form onSubmit={handleAddCategory}>
                    <div className="mb-4">
                      <label htmlFor="category-name" className="block text-gray-700">Category Name</label>
                      <input
                        id="category-name"
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="category-image" className="block text-gray-700">Image</label>
                      <input
                        id="category-image"
                        type="file"
                        onChange={(e) => setNewCategoryImage(e.target.files[0])}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCategory(false)}
                        className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'users':
        return (
          <div>
            <h2 className="text-xl mb-4 flex items-center justify-between">
              Users
              <button
                onClick={() => setShowAddUser(true)}
                className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add New User
              </button>
            </h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => console.log('Edit user:', user)}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
    
            {showAddUser && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-xl font-bold mb-4">Add New User</h2>
                  <form onSubmit={handleAddUser}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-700">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="role" className="block text-gray-700">Role</label>
                      <select
                        id="role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add User
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddUser(false)}
                        className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div>Select a tab to view data</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-100 bg-gray-800 text-white p-4 adminSidePanel">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <button
          onClick={() => setSelectedTab('categories')}
          className={`w-full py-2 px-4 mb-2 text-left ${selectedTab === 'categories' ? 'bg-gray-600' : 'hover:bg-gray-700'} rounded`}
        >
          Categories
        </button>
        <button
          onClick={() => setSelectedTab('users')}
          className={`w-full py-2 px-4 mb-2 text-left ${selectedTab === 'users' ? 'bg-gray-600' : 'hover:bg-gray-700'} rounded`}
        >
          Users
        </button>
      </div>

      <div className="w-3/4 p-8">
        {renderTable()}
      </div>
    </div>
  );
};

export default Dashboard;