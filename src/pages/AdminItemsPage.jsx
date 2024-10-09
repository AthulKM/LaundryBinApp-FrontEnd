import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';
import axios from 'axios';
import '../AdminItemsPage.css';
import axiosInstance from '../axios/axiosInstance';

const AdminItemsPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemName: '', charge: 0, count: 1 });
  const [newImage, setNewImage] = useState(null);  // For handling image file
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ itemName: '', charge: 0, count: 1 });
  const [updatedImage, setUpdatedImage] = useState(null);  // For handling updated image file

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from the server
  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/items');
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Handle form submission for creating a new item with an image
  const handleCreateItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', newItem.itemName);
    formData.append('charge', newItem.charge);
    formData.append('count', newItem.count);
    if (newImage) {
      formData.append('image', newImage);  // Append image file
    }

    try {
      await axiosInstance.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewItem({ itemName: '', charge: 0, count: 1 });
      setNewImage(null);  // Reset the image
      fetchItems(); // Refresh the item list
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  // Open the edit modal and set the selected item
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setUpdatedItem({ itemName: item.itemName, charge: item.charge, count: item.count });
    setShowEditModal(true);
  };

  // Handle form submission for updating an item with optional image
  const handleUpdateItem = async () => {
    const formData = new FormData();
    formData.append('itemName', updatedItem.itemName);
    formData.append('charge', updatedItem.charge);
    formData.append('count', updatedItem.count);
    if (updatedImage) {
      formData.append('image', updatedImage);  // Append updated image file if available
    }

    try {
      await axiosInstance.put(`/items/${selectedItem._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowEditModal(false);
      setUpdatedImage(null);  // Reset the updated image
      fetchItems();  // Refresh the item list
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id) => {
    try {
      await axiosInstance.delete(`/items/${id}`);
      fetchItems();  // Refresh the item list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Manage Items</h1>

      {/* Create Item Form */}
      <Form onSubmit={handleCreateItem}>
        <Form.Group controlId="itemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={newItem.itemName}
            onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="charge">
          <Form.Label>Charge</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter charge"
            value={newItem.charge}
            onChange={(e) => setNewItem({ ...newItem, charge: parseFloat(e.target.value) })}
            required
          />
        </Form.Group>
        <Form.Group controlId="count">
          <Form.Label>Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count"
            value={newItem.count}
            onChange={(e) => setNewItem({ ...newItem, count: parseInt(e.target.value) })}
            required
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Item Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Add Item
        </Button>
      </Form>

      {/* Item List */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Charge (₹)</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image} alt={item.itemName} className="item-image" />
              </td>
              <td>{item.itemName}</td>
              <td>{item.charge}</td>
              <td>{item.count}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(item)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedItem.itemName}
                onChange={(e) => setUpdatedItem({ ...updatedItem, itemName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="editCharge">
              <Form.Label>Charge</Form.Label>
              <Form.Control
                type="number"
                value={updatedItem.charge}
                onChange={(e) => setUpdatedItem({ ...updatedItem, charge: parseFloat(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group controlId="editCount">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="number"
                value={updatedItem.count}
                onChange={(e) => setUpdatedItem({ ...updatedItem, count: parseInt(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group controlId="editImage">
              <Form.Label>Item Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminItemsPage;
