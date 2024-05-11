"use client";

import Image from "next/image";
import { ReactNode, useEffect, useMemo, useState } from "react";
import "./styles.css";
import { useEffectEvent } from "../utils/useEffectEvent";

type TabContent = {
    id: number;
    title: string;
    content: ReactNode;
    active: boolean;
};

export default function Tabs(): React.JSX.Element {
    const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
    const activeContent: TabContent = initialTabContents[activeContentIndex];

    const tabContents: TabContent[] = useMemo(() => {
        return initialTabContents.map((tabContent, index) => {
            return { ...tabContent, active: index === activeContentIndex };
        });
    }, [activeContentIndex]);

    const btns: React.JSX.Element[] = initialTabContents.map(tabContent => {
        return <button onClick={() => setActiveContentIndex(tabContent.id)} key={tabContent.id} className={`tab-btn${tabContent.id === activeContentIndex ? ' active' : ''}`} data-id={tabContent.title.toLowerCase()}>{tabContent.title}</button>
    });

    const contentList: React.JSX.Element[] = tabContents.map(tabContent => {
        return (
            <div key={tabContent.id} className={`content${tabContent.id === activeContentIndex ? ' active' : ''}`} id={tabContent.title.toLowerCase()}>
                <h4 className="text-lg font-medium">{tabContent.title}</h4>
                {tabContent.content}
            </div>
        );
    });

    // const handleContainerClick = useEffectEvent((e: Event) => {
    //     const id: string | undefined = (e.target as HTMLElement).dataset.id;
    //     if (id) {
    //         document.querySelectorAll('.tab-btn').forEach((btn: Element): void => {
    //             btn.classList[(btn as HTMLElement).dataset.id === id ? 'add' : 'remove']('active');
    //         });

    //         document.querySelectorAll('.content').forEach((article: Element): void => {
    //             article.classList[article.id === id ? 'add' : 'remove']('active');
    //         });
    //     }
    // });

    // useEffect(() => {
    //     const about: Element = document.querySelector('.about')!;
    //     about.addEventListener('click', handleContainerClick);
    //     return (): void => { about.removeEventListener('click', handleContainerClick); };
    // }, [handleContainerClick]);

    return (
        <section>
            <div className="flex flex-col text-center mb-4">
                <h2 className="text-4xl font-extrabold">About</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, aperiam!</p>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <article>
                    <Image className="mb-8 lg:mb-0 rounded-xl object-cover" src="/hero-bcg.jpeg" alt="hero" width={1000} height={684} priority />
                </article>
                <article className="bg-gray-100 rounded-lg about">
                    <div className="grid grid-cols-3">{btns}</div>
                    <div className="mx-6 my-8">
                        {/* {contentList} */}
                        <div key={activeContent.id} className="content active" id={activeContent.title.toLowerCase()}>
                            <h4 className="text-lg font-medium">{activeContent.title}</h4>
                            {activeContent.content}
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}

const initialTabContents: TabContent[] = [
    { id: 0, title: 'History', content: <p>I&apos;m baby wolf pickled schlitz try-hard normcore marfa man bun mumblecore vice pop-up XOXO lomo kombucha glossier bicycle rights. Umami kinfolk salvia jean shorts offal venmo. Knausgaard tilde try-hard, woke fixie banjo man bun. Small batch tumeric mustache tbh wayfarers 8-bit shaman chartreuse tacos. Viral direct trade hoodie ugh chambray, craft beer pork belly flannel tacos single-origin coffee art party migas plaid pop-up.</p>, active: true },
    { id: 1, title: 'Vision', content: <div className="space-y-2"><p>Man bun PBR&B keytar copper mug prism, hell of helvetica. Synth crucifix offal deep v hella biodiesel. Church-key listicle polaroid put a bird on it chillwave palo santo enamel pin, tattooed meggings franzen la croix cray. Retro yr aesthetic four loko tbh helvetica air plant, neutra palo santo tofu mumblecore. Hoodie bushwick pour-over jean shorts chartreuse shabby chic. Roof party hammock master cleanse pop-up truffaut, bicycle rights skateboard affogato readymade sustainable deep v live-edge schlitz narwhal.</p><ul><li>list item</li><li>list item</li><li>list item</li></ul></div>, active: false },
    { id: 2, title: 'Goals', content: <p>Chambray authentic truffaut, kickstarter brunch taxidermy vape heirloom four dollar toast raclette shoreditch church-key. Poutine etsy tote bag, cred fingerstache leggings cornhole everyday carry blog gastropub. Brunch biodiesel sartorial mlkshk swag, mixtape hashtag marfa readymade direct trade man braid cold-pressed roof party. Small batch adaptogen coloring book heirloom. Letterpress food truck hammock literally hell of wolf beard adaptogen everyday carry. Dreamcatcher pitchfork yuccie, banh mi salvia venmo photo booth quinoa chicharrones.</p>, active: false }
];
