import { Authorize } from "@/components/Authorize";
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Title } from "@/components/Title";
import { CartDetailModel } from "@/functions/swagger/BackEnd";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { Page } from "@/types/Page";
import Link from "next/link";
import useSwr from 'swr';

const CartDisplayItem: React.FC<{
    cart: CartDetailModel
}> = ({ cart }) => {

    return (
        <tr>
            <td className="border px-4 py-2">{cart.id}</td>
            <td className="border px-4 py-2">{cart.foodItemsId}</td>
            <td className="border px-4 py-2">{'Rp.' + cart.foodItemsPrice?.toLocaleString()}</td>
            <td className="border px-4 py-2">{cart.qty}</td>
        </tr>

    );
};

const InnerIndexPage: React.FC = () => {
    const fetcher = useSwrFetcherWithAccessToken();
    const { data } = useSwr<CartDetailModel[]>('/api/be/api/CartDetails', fetcher);

    return (
        <div>
            <Title>Order Summary</Title>
            <Link href='/'>Return to Index</Link>
            <table className='table-auto mt-4'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Id</th>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'>Qty</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <CartDisplayItem key={i} cart={x} />)}
                </tbody>
                <tfoot className='bg-slate-700 text-white'>
                    <tr>
                        <td className='px-4 py-2'>Total Price</td>
                        <td className='px-4 py-2'></td>
                    </tr>
                    <tr>
                        <Link href='/order-finished'>
                            Order
                        </Link>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

const IndexPage: Page = () => {
    return (
        <Authorize>
            <InnerIndexPage></InnerIndexPage>
        </Authorize>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;