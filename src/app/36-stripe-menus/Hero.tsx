import Image from "next/image";
import { memo } from "react";
import phoneImg from './images/phone.svg';
import { useGlobalContext } from "./context";

const Hero = memo((): React.JSX.Element => {
    const { closeSubmenu } = useGlobalContext();
    return (
        <section className="bg-[url('/stripe-menus/hero.svg')] bg-cover lg:-mt-20 min-h-[calc(100vh-5rem)] flex items-center justify-center" onMouseOver={closeSubmenu}>
            <div className="w-[90%] grid lg:grid-cols-3 items-center">
                <article className="col-span-2 space-y-4">
                    <h1 className="text-5xl font-bold">
                        Payments infrastructure <br />
                        for the internet
                    </h1>
                    <p className="text-lg font-light leading-relaxed">
                        Millions of companies of all sizes—from startups to Fortune 500s—use
                        Stripe&apos;s software and APIs to accept payments, send payouts, and
                        manage their businesses online.
                    </p>
                    <button className="py-1 px-3 rounded-xl text-white bg-black hover:bg-gray-800">Start now</button>
                </article>
                <article className="justify-self-center mt-4 lg:m-0">
                    <Image src={phoneImg} className="lg:w-72 w-48" alt="phone" />
                </article>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';
export default Hero;
