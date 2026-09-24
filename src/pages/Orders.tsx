import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetUserOrders } from "@/store/orders/ordersSlice";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Heading from "@/components/common/Heading";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { error, loading, ordersList } = useAppSelector(
    (state) => state.orders,
  );

  console.log(ordersList);

  useEffect(() => {
    dispatch(actGetUserOrders());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto my-20 mx-auto max-w-3/4">
      <Heading title="Your orders" />

      {ordersList?.map((orders, index) => (
        <div className="my-6">
          <h4 className="text-green-600 mb-1 font-bold underline text-lg">
            #0{index + 1} Order
          </h4>

          <Table className="text-black! text-center border border-gray-300">
            <TableHead>
              <TableRow>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Image</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Sub Total</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y">
              {orders.cartItems.map((order, index) => (
                <TableRow className="border-gray-400">
                  <TableCell>0{index + 1}</TableCell>

                  <TableCell>
                    <img
                      className="mx-auto w-14 h-14 md:w-28 md:h-28 rounded-lg object-cover shrink-0 shadow-sm"
                      src={order.product.imageCover}
                      alt={order.product.title}
                    />
                  </TableCell>

                  <TableCell className="max-w-36 font-semibold">
                    <span className="line-clamp-3 mx-auto leading-snug">
                      {order.product.title}
                    </span>
                  </TableCell>

                  <TableCell>{order.product.category?.name}</TableCell>

                  <TableCell className="p-0">
                    ${order.price.toFixed(2)} &#x00D7; {order.count}
                  </TableCell>

                  <TableCell className="text-green-700 font-semibold">
                    ${(order.count * order.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="md:flex-row-reverse flex">
            <button className="font-semibold text-base my-2 bg-green-500 py-1 px-3 rounded text-white transition duration-150 hover:bg-green-600 cursor-pointer disabled:bg-green-300 disabled:cursor-default">
              Place Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
