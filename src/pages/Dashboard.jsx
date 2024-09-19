import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Table, Modal, Form, Spinner, Container, Row, Col } from 'react-bootstrap';

// const Dashboard = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('categories');
//   const [loading, setLoading] = useState(true);
//   const [showAddCategory, setShowAddCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [newCategoryImage, setNewCategoryImage] = useState(null);

//   const [users, setUsers] = useState([]);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [newUser, setNewUser] = useState({
//     email: '',
//     username: '',
//     password: '',
//     role: 'user',
//   });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8003/api/category/');
//       setCategories(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setLoading(false);
//     }
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', newCategoryName);
//     formData.append('image', newCategoryImage);

//     try {
//       const response = await axios.post('http://localhost:8003/api/category/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setNewCategoryName('');
//       setNewCategoryImage(null);
//       setShowAddCategory(false);
//       const addedCategory = response.data.data;

//       if (addedCategory) {
//         setCategories((prevCategories) => [...prevCategories, addedCategory]);
//       }
//     } catch (error) {
//       console.error('Error adding category:', error);
//     }
//   };

//   const handleDeleteCategory = async (categoryId) => {
//     try {
//       await axios.delete(`http://localhost:8003/api/category/${categoryId}`);
//       setCategories(categories.filter((category) => category._id !== categoryId));
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8004/api/user/');
//         setUsers(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8004/api/user/register', newUser);
//       setShowAddUser(false);
//       setNewUser({
//         email: '',
//         username: '',
//         password: '',
//         role: 'user',
//       });

//       const response = await axios.get('http://localhost:8004/api/user/');
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:8004/api/user/${userId}`);
//       const response = await axios.get('http://localhost:8004/api/user/');
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const renderTable = () => {
//     switch (selectedTab) {
//       case 'categories':
//         return (
//           <div>
//             <h2 className="mb-4 d-flex justify-content-between align-items-center">
//               Categories
//               <Button variant="success" onClick={() => setShowAddCategory(true)}>
//                 Add New Category
//               </Button>
//             </h2>
//             {loading ? (
//               <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             ) : (
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Image</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categories.length > 0 ? (
//                     categories.map((category) => (
//                       <tr key={category._id}>
//                         <td>{category.name}</td>
//                         <td>
//                           <img src={category.image} alt={category.name} width="100" height="100" />
//                         </td>
//                         <td>
//                           <Button
//                             variant="primary"
//                             className="me-2"
//                             onClick={() => console.log('Edit functionality pending')}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="danger"
//                             onClick={() => handleDeleteCategory(category._id)}
//                           >
//                             Remove
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="text-center">
//                         No categories found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             )}

//             <Modal show={showAddCategory} onHide={() => setShowAddCategory(false)}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Add New Category</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form onSubmit={handleAddCategory}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Category Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={newCategoryName}
//                       onChange={(e) => setNewCategoryName(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Image</Form.Label>
//                     <Form.Control
//                       type="file"
//                       onChange={(e) => setNewCategoryImage(e.target.files[0])}
//                       required
//                     />
//                   </Form.Group>
//                   <Button variant="primary" type="submit">
//                     Add Category
//                   </Button>
//                 </Form>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={() => setShowAddCategory(false)}>
//                   Close
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//         );
//       case 'users':
//         return (
//           <div>
//             <h2 className="mb-4 d-flex justify-content-between align-items-center">
//               Users
//               <Button variant="success" onClick={() => setShowAddUser(true)}>
//                 Add New User
//               </Button>
//             </h2>
//             {loading ? (
//               <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             ) : (
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Email</th>
//                     <th>Username</th>
//                     <th>Role</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.length > 0 ? (
//                     users.map((user) => (
//                       <tr key={user._id}>
//                         <td>{user.email}</td>
//                         <td>{user.username}</td>
//                         <td>{user.role}</td>
//                         <td>
//                           <Button
//                             variant="primary"
//                             className="me-2"
//                             onClick={() => console.log('Edit user:', user)}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="danger"
//                             onClick={() => handleDeleteUser(user._id)}
//                           >
//                             Remove
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center">
//                         No users found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             )}

//             <Modal show={showAddUser} onHide={() => setShowAddUser(false)}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Add New User</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form onSubmit={handleAddUser}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={newUser.email}
//                       onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={newUser.username}
//                       onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       value={newUser.password}
//                       onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Role</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={newUser.role}
//                       onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                     >
//                       <option value="user">User</option>
//                       <option value="admin">Admin</option>
//                     </Form.Control>
//                   </Form.Group>
//                   <Button variant="primary" type="submit">
//                     Add User
//                   </Button>
//                 </Form>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={() => setShowAddUser(false)}>
//                   Close
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//         );
//       default:
//         return <div>Select a tab to view data</div>;
//     }
//   };

//   return (
//     <Container fluid>
//       <Row>
//         <Col md={3} className="bg-dark text-white p-3">
//           <h2 className="mb-4">Admin Panel</h2>
//           <Button
//             variant={selectedTab === 'categories' ? 'secondary' : 'dark'}
//             className="w-100 mb-2 text-left"
//             onClick={() => setSelectedTab('categories')}
//           >
//             Categories
//           </Button>
//           <Button
//             variant={selectedTab === 'users' ? 'secondary' : 'dark'}
//             className="w-100 mb-2 text-left"
//             onClick={() => setSelectedTab('users')}
//           >
//             Users
//           </Button>
//         </Col>

//         <Col md={9} className="p-4">
//           {renderTable()}
//         </Col>
//       </Row>
//     </Container>
//   );
// };


const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState('categories');
  const [loading, setLoading] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    role: 'user',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category/');
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/user/');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newCategoryName);
    formData.append('image', newCategoryImage);

    try {
      const response = await axiosInstance.post('/category/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewCategoryName('');
      setNewCategoryImage(null);
      setShowAddCategory(false);
      setCategories((prevCategories) => [...prevCategories, response.data.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editingCategory.name);
    if (editingCategory.image) {
      formData.append('image', editingCategory.image);
    }

    try {
      const response = await axiosInstance.put(`/category/${editingCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowEditCategory(false);
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat._id === response.data.data._id ? response.data.data : cat))
      );
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axiosInstance.delete(`/category/${categoryId}`);
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/user/register', newUser);
      setShowAddUser(false);
      setNewUser({
        email: '',
        phoneNumber:'',
        username: '',
        password: '',
        role: 'user',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/user/${editingUser._id}`, editingUser);
      setShowEditUser(false);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderTable = () => {
    switch (selectedTab) {
      case 'categories':
        return (
          <div>
            <h2 className="mb-4 d-flex justify-content-between align-items-center">
              Categories
              <Button variant="success" onClick={() => setShowAddCategory(true)}>
                Add New Category
              </Button>
            </h2>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <img src={category.image} alt={category.name} width="100" height="100" />
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => {
                              setEditingCategory(category);
                              setShowEditCategory(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}

            <Modal show={showAddCategory} onHide={() => setShowAddCategory(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddCategory}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setNewCategoryImage(e.target.files[0])}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add Category
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddCategory(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showEditCategory} onHide={() => setShowEditCategory(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {editingCategory && (
                  <Form onSubmit={handleEditCategory}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.files[0] })}
                      />
                      <img src={editingCategory.image} alt={editingCategory.name} width="100" height="100" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Update Category
                    </Button>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditCategory(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );

      case 'users':
        return (
          <div>
            <h2 className="mb-4 d-flex justify-content-between align-items-center">
              Users
              <Button variant="success" onClick={() => setShowAddUser(true)}>
                Add New User
              </Button>
            </h2>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                      <th>Email</th>
                      <th>Phone Number</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{ user.phoneNumber}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => {
                              setEditingUser(user);
                              setShowEditUser(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}

            <Modal show={showAddUser} onHide={() => setShowAddUser(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddUser}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add User
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddUser(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showEditUser} onHide={() => setShowEditUser(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {editingUser && (
                  <Form onSubmit={handleEditUser}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingUser.phoneNumber}
                        onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={editingUser.password}
                        onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        as="select"
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Update User
                    </Button>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditUser(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );

      default:
        return <div>Select a tab to view data</div>;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-dark text-white p-3">
          <h2 className="mb-4">Admin Panel</h2>
          <Button
            variant={selectedTab === 'categories' ? 'secondary' : 'dark'}
            className="w-100 mb-2 text-left"
            onClick={() => setSelectedTab('categories')}
          >
            Categories
          </Button>
          <Button
            variant={selectedTab === 'users' ? 'secondary' : 'dark'}
            className="w-100 mb-2 text-left"
            onClick={() => setSelectedTab('users')}
          >
            Users
          </Button>
        </Col>

        <Col md={9} className="p-4">
          {renderTable()}
        </Col>
      </Row>
    </Container>
  );
};



export default Dashboard;