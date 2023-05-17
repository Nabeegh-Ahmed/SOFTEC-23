import React from 'react'
import { Box, Grid, Chip, Typography, Rating, Avatar, Modal, Input, InputLabel, Select } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { InventoryItemModalProps } from './index.types';
import { InventoryType } from '../../../../../../../../types';
import CustomButton from '../../../../../../../../components/CustomButton';

const inventoryTypes: string[] = Object.keys(InventoryType) as string[]

const InventoryItemModal: React.FC<InventoryItemModalProps> = ({ item, action, onClose, onSubmit, onChange, modalOpen }) => {

    return (
        <Modal
            open={modalOpen}
            className='overflow-y-scroll h-full w-full'
            onClose={onClose}
        >
            <Box className="bg-white p-5 rounded-md">
                <Typography variant="h6" fontWeight="bold" className="text-gray-600">
                    Add Inventory Item
                </Typography>
                <Box className="mt-2">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Title
                            </Typography>
                            <input
                                type="text"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.title}
                                onChange={(e) => onChange({ ...item, title: e.target.value })}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Photo
                            </Typography>
                            <input
                                type="text"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.photo}
                                onChange={(e) => onChange({ ...item, photo: e.target.value })}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Description
                            </Typography>
                            <input
                                type="text"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.description}
                                onChange={(e) => onChange({ ...item, description: e.target.value })}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Market Price
                            </Typography>
                            <input
                                type="number"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.market_price}
                                onChange={(e) => onChange({ ...item, market_price: parseInt(e.target.value) })}
                                min={0}
                                required={true}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Cost Price
                            </Typography>
                            <input
                                type="number"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.cost_price}
                                onChange={(e) => onChange({ ...item, cost_price: parseInt(e.target.value) })}
                                min={0}
                                required={true}
                            />

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Quantity
                            </Typography>
                            <input
                                type="number"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.quantity}
                                onChange={(e) => onChange({ ...item, quantity: parseInt(e.target.value) })}
                                min={1}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Minimum Age
                            </Typography>
                            <input
                                type="number"
                                className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                value={item.minimum_age}
                                onChange={(e) => onChange({ ...item, minimum_age: parseInt(e.target.value) })}
                                min={1}
                                required={true}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Typography variant="body2" className="text-gray-500">
                                Inventory Type
                            </Typography>
                            <>

                                <Select native value={item.inventory_type} onChange={(e) => onChange({ ...item, inventory_type: e.target.value as InventoryType })}>
                                    {
                                        inventoryTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))
                                    }
                                </Select>

                            </>
                        </Grid>

                        {
                            item.inventory_type === "video_game" ?
                                <>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="body2" className="text-gray-500">
                                            Publisher
                                        </Typography>
                                        <input
                                            type="text"
                                            className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                            value={item.publisher}
                                            onChange={(e) => onChange({ ...item, publisher: e.target.value })}
                                            required={true}
                                        />
                                    </Grid>
                                </> : <>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="body2" className="text-gray-500">
                                            Manufacturer
                                        </Typography>
                                        <input
                                            type="text"
                                            className="border-[1px] border-gray-200 rounded-md p-3 mt-2 w-full"
                                            value={item.manufacturer}
                                            onChange={(e) => onChange({ ...item, manufacturer: e.target.value })}
                                            required={true}
                                        />
                                    </Grid>
                                </>
                        }
                    </Grid>
                </Box>
                <Box className="mt-5 flex justify-end">
                    <CustomButton onClick={onClose} className="mr-2">
                        Cancel
                    </CustomButton>
                    <CustomButton onClick={onSubmit}>
                        {
                            action === 'add' ? 'Add' : 'Update'
                        }
                    </CustomButton>
                </Box>
            </Box>
        </Modal>
    )
}

export default InventoryItemModal