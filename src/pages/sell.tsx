import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import DefaultLayout from "@/layouts/default";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import abi from "@/abi.json";
import { useContractWrite } from "wagmi";

// const WalletAddress = "0xd59accf68daef585f30fb12b06c65be04336f5ee";

// const contractABI = [
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_id",
//         type: "uint256",
//       },
//     ],
//     name: "buyProduct",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "_name",
//         type: "string",
//       },
//       {
//         internalType: "uint256",
//         name: "_price",
//         type: "uint256",
//       },
//     ],
//     name: "listProduct",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "id",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "price",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "seller",
//         type: "address",
//       },
//     ],
//     name: "ProductListed",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "id",
//         type: "uint256",
//       },
//     ],
//     name: "ProductRemoved",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "id",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "price",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "seller",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "buyer",
//         type: "address",
//       },
//     ],
//     name: "ProductSold",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "buyer",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "RefundIssued",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_id",
//         type: "uint256",
//       },
//     ],
//     name: "removeProduct",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "activeProductCount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getActiveProductCount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getActiveProducts",
//     outputs: [
//       {
//         components: [
//           {
//             internalType: "uint256",
//             name: "id",
//             type: "uint256",
//           },
//           {
//             internalType: "string",
//             name: "name",
//             type: "string",
//           },
//           {
//             internalType: "uint256",
//             name: "price",
//             type: "uint256",
//           },
//           {
//             internalType: "address payable",
//             name: "seller",
//             type: "address",
//           },
//           {
//             internalType: "bool",
//             name: "sold",
//             type: "bool",
//           },
//           {
//             internalType: "address",
//             name: "buyer",
//             type: "address",
//           },
//           {
//             internalType: "bool",
//             name: "exists",
//             type: "bool",
//           },
//         ],
//         internalType: "struct VillageMarketplace.Product[]",
//         name: "",
//         type: "tuple[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "productCount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "products",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "id",
//         type: "uint256",
//       },
//       {
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//       {
//         internalType: "uint256",
//         name: "price",
//         type: "uint256",
//       },
//       {
//         internalType: "address payable",
//         name: "seller",
//         type: "address",
//       },
//       {
//         internalType: "bool",
//         name: "sold",
//         type: "bool",
//       },
//       {
//         internalType: "address",
//         name: "buyer",
//         type: "address",
//       },
//       {
//         internalType: "bool",
//         name: "exists",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

export default function SellPage() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // Configure the contract write operation
  const config = {
    address: import.meta.env.VITE_CONTRACT_ADDRESS, // Your contract address
    abi: abi, // Your contract ABI
    functionName: "listProduct",
    args: [productName, productPrice], // Use parseEther to convert price to wei
  };

  const { write, isLoading, isSuccess } = useContractWrite(config);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!write) {
      toast.error("Contract write function not available");
      return;
    }

    // Call the write function to execute the transaction
    try {
      await write(); // Execute the transaction
    } catch (err: any) {
      toast.error("Transaction error: " + (err.message || err));
    }
  };

  // Show toast notifications based on loading and success states
  if (isLoading) {
    toast.loading("Listing product...");
  }

  if (isSuccess) {
    toast.success("Product listed successfully");
    // Reset the form fields on success
    setProductName("");
    setProductPrice("");
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sell Your Products</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Product Name"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Input
                label="Price"
                id="productPrice"
                type="number"
                min="0"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              List Product
            </Button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
