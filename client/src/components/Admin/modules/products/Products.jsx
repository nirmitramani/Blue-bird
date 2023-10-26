import React, { useState, useEffect, useMemo } from 'react';
import Button from '../../hooks/Button';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';
import { FaSearch } from "react-icons/fa";
import useDragAndDrop from '../../hooks/useDragAndDrop';
import useAnimatedLoader from '../../hooks/useAnimatedLoader';
import ConfirmDelete from '../../hooks/ConfirmDelete';
import { usePagination, Pagination } from '../../hooks/Pagination';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { loading, startAnimatedLoading, stopAnimatedLoading, Loader } = useAnimatedLoader();
    const [searchQuery, setSearchQuery] = useState('');
    const [switchStates, setSwitchStates] = useState({});

    const handleReorder = async (newOrder) => {
        try {
            await axios.post(`${window.react_app_url + window.product_url}/reorder`, { newOrder });
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const { draggedItem, handleDragStart, handleDragEnd } = useDragAndDrop(handleReorder);

    useEffect(() => {
        const initialSwitchStates = {};
        products.forEach((product) => {
            initialSwitchStates[product._id] = product.status === 'Active';
        });
        setSwitchStates(initialSwitchStates);
    }, [products]);

    useEffect(() => {
        startAnimatedLoading()
        axios.get(`${window.react_app_url + window.product_url}`)
            .then(async (result) => {
                setProducts(result.data.data);
                stopAnimatedLoading()

                // Fetch category information for each product
                const categoryIds = result.data.data.map(product => product.categoryid);
                const categoryRequests = categoryIds.map(categoryId =>
                    axios.get(`${window.react_app_url + window.product_category_url}/${categoryId}`)
                );

                try {
                    const categoryResponses = await Promise.all(categoryRequests);
                    const categoryData = categoryResponses.map(response => response.data.data);
                    setCategories(categoryData);
                } catch (error) {
                    console.error('Error fetching category data:', error);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        handlePageChange(1)
    };

    const handleStatusChange = (id) => {
        setSwitchStates((prevSwitchStates) => ({
            ...prevSwitchStates,
            [id]: !prevSwitchStates[id],
        }));

        const newStatus = switchStates[id] ? 'Inactive' : 'Active';

        axios.put(`${window.react_app_url + window.product_url}/status/${id}`, { status: newStatus })
            .then(res => {
                console.log(res);
                const message = `Status updated to ${newStatus}`;
                toast.success(message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        ConfirmDelete()({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this?',
            onConfirm: () => deleteProduct(id),
        });
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${window.react_app_url + window.product_url}/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            toast.success(response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [products, searchQuery]);

    const { currentPage, totalPages, handlePageChange, currentItems } = usePagination(filteredProducts);

    return (
        <>
            {loading ? (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 fade-loader'>
                    <div role='status'>
                        <div className="flex">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full absolute
                            border-4 border-solid border-gray-200"></div>
                                <div className="w-12 h-12 rounded-full animate-spin absolute
                            border-4 border-solid border-red-500 border-t-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <BreadCrumb title="Products" desc="" link="/admin" />
                <div className="flex flex-wrap items-start justify-end -mb-3 p-4">
                    <Link to="/admin/products/add">
                        <Button label="Add new Product" iconURL={<AiOutlinePlus />} />
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex flex-auto space-x-2 justify-center items-center">
                <div className="w-1/3 relative flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white border-2 overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <FaSearch />
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="search"
                        id="search"
                        placeholder="Search product"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-8">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        {currentItems.length > 0 ? (
                            <>
                                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Description
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Category Name
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Image
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    ACTIONS
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((product, index) => (
                                                <tr
                                                    key={product._id}
                                                    draggable
                                                    onDragStart={() => handleDragStart(product)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={() => handleDragEnd(index, currentItems, setProducts)}
                                                >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex">
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex">
                                                            <div className="ml-3">
                                                                <p className="text-gray-600 whitespace-no-wrap">{product.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex">
                                                            <div className="ml-3">
                                                                <p className="text-gray-600 whitespace-no-wrap">{product.price}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex">
                                                            <div className="ml-3">
                                                                <p className="text-gray-600 whitespace-no-wrap">
                                                                    {product.categoryid
                                                                        ? (
                                                                            categories.find(category => category._id === product.categoryid)
                                                                                ? categories.find(category => category._id === product.categoryid).name
                                                                                : (
                                                                                    <span>
                                                                                        Category not found
                                                                                    </span>
                                                                                )
                                                                        )
                                                                        : "Category not found"
                                                                    }
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="h-full rounded-sm w-48"
                                                                src={`http://localhost:3000/public/images/products/${product.productimg}`}
                                                                alt={product.name}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <label className="relative inline-flex cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer"
                                                                id={`flexSwitchCheckChecked_${product._id}`}
                                                                checked={switchStates[product._id] || false}
                                                                onChange={() => handleStatusChange(product._id)}
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </td>

                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
                                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">
                                                                <Link to={`update/${product._id}`}>
                                                                    Edit
                                                                </Link>
                                                            </span>
                                                        </span>
                                                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                                            <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">
                                                                <Link to={`view/${product._id}`}>
                                                                    <button>View</button>
                                                                </Link>
                                                            </span>
                                                        </span>
                                                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                                            <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">
                                                                <button onClick={() => handleDelete(product._id)}>
                                                                    Delete
                                                                </button>
                                                            </span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    handlePageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <p className="text-center text-gray-500">No data found</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Products;
