"use client";

import "./styles.css";
import { Button } from "../components/Button";

const toggleModal = (): void => {
    const modal: Element = document.querySelector('.modal-overlay')!;
    modal.classList.toggle('open-modal');
};

export default function Modal(): React.JSX.Element {
    return (
        <div className="relative">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            <header className="hero">
                <div className=" w-96 bg-white py-16 rounded-xl text-center shadow shadow-black">
                    <h2 className="text-5xl font-extrabold mb-6">Modal Project</h2>
                    <Button onClick={toggleModal} className="uppercase">Open Modal</Button>
                </div>
            </header>
            <div className="modal-overlay">
                <div className="modal-container">
                    <h3 className="text-3xl font-bold">Modal Content</h3>
                    <button onClick={toggleModal} className="close-btn"><i className="fas fa-times"></i></button>
                </div>
            </div>
        </div>
    )
}
