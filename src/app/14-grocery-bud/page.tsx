"use client";

import { FormEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";

type ListItem = {
    id: string;
    text: string;
};

type AlertAction = 'danger' | 'success';
type AlertType = {
    text: string;
    action: AlertAction;
};

export default function GroceryBud(): React.JSX.Element {
    const [formInput, setFormInput] = useState<string>('');
    const [selectedItemId, setSelectedItemId] = useState<string>('');
    const [listItems, setListItems, removeListItems] = useLocalStorage<ListItem[]>('list', [], { initializeWithValue: false });
    const [alert, setAlert] = useState<AlertType | null>(null);

    const isEditing: boolean = !!selectedItemId;

    const displayAlert = useCallback((text: string, action: AlertAction): void => {
        setAlert({ text, action });
        setTimeout(() => setAlert(null), 1000);
    }, []);

    const setBackToDefault = useCallback((): void => {
        setFormInput('');
        setSelectedItemId('');
    }, []);

    const addItem = useCallback((): void => {
        const listItem: ListItem = { id: uuidv4(), text: formInput };
        setListItems(items => [...items, listItem]);
        setBackToDefault();
        displayAlert(`'${listItem.text}' added to the list`, 'success');
    }, [displayAlert, formInput, setBackToDefault, setListItems]);

    const editItem = useCallback((): void => {
        const editedItem: ListItem = listItems.find(item => item.id === selectedItemId)!;
        const previousText: string = editedItem.text;
        editedItem.text = formInput;
        setListItems(listItems.map(item => item.id === selectedItemId ? editedItem : item));
        setBackToDefault();
        displayAlert(`Changed ${previousText} to ${editedItem.text}`, 'success');
    }, [displayAlert, formInput, listItems, selectedItemId, setBackToDefault, setListItems]);

    const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (formInput && !isEditing)  addItem();
        else if (formInput && isEditing) editItem();
        else displayAlert('Please enter value', 'danger');
    }, [addItem, displayAlert, editItem, formInput, isEditing]);

    const handleEditClick = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
        const id: string = e.currentTarget.parentElement!.dataset.id!;
        const item: ListItem = listItems.find(item => item.id === id)!;
        setSelectedItemId(id);
        setFormInput(item.text);
    }, [listItems]);

    const handleRemoveClick = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
        const id: string = e.currentTarget.parentElement!.dataset.id!;
        const item: ListItem = listItems.find(item => item.id === id)!;
        setListItems(listItems.filter(item => item.id !== id));
        setBackToDefault();
        displayAlert(`Removed '${item.text}' from the list`, 'danger');
    }, [displayAlert, listItems, setBackToDefault, setListItems]);

    const handleClearClick = useCallback(() => {
        removeListItems();
        setBackToDefault();
        displayAlert('Cleared the list', 'danger');
    }, [displayAlert, removeListItems, setBackToDefault]);

    const itemsList: React.JSX.Element[] = useMemo(() =>listItems.map(item => {
        return (
            <article key={item.id} className="grocery-item">
                <p className="title">{item.text}</p>
                <div data-id={item.id}>
                    <button type="button" className="edit-btn" onClick={handleEditClick}><i className="fas fa-edit"></i></button>
                    <button type="button" className="delete-btn" onClick={handleRemoveClick}><i className="fas fa-trash"></i></button>
                </div>
            </article>
        );
    }), [handleEditClick, handleRemoveClick, listItems]);

    const itemsContainer: React.JSX.Element = useMemo(() => {
        return (
            <div className="grocery-container">
                <div className="grocery-list">{itemsList}</div>
                <button onClick={handleClearClick} className="clear-btn">Clear Items</button>
            </div>
        );
    }, [handleClearClick, itemsList]);

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            <section className="section-center">
                <form className="grocery-form" onSubmit={handleFormSubmit}>
                    <p className={`alert${alert ? ` alert-${alert.action}` : ''}`}>{alert?.text}</p>
                    <h2 className="text-2xl font-bold">Grocery Bud</h2>
                    <div className="form-control">
                        <input id="grocery" placeholder="e.g. eggs" value={formInput} onChange={e => setFormInput(e.target.value)} />
                        <button type="submit" className="submit-btn">{isEditing ? 'Edit' : 'Add'}</button>
                    </div>
                </form>
                {listItems.length > 0 && itemsContainer}
            </section>
        </div>
    );
}
