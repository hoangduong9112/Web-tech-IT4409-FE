import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Button from 'antd/lib/button';
import { useStateValue } from '../application/state-provider';
import { Input } from 'antd';
import { v4 as uuid } from 'uuid';
import { convertUser } from '../utils/convertFromRaw';
import moment from 'moment';
import Comment from './Comment';

const CardModal = ({ card, closeModal, visible, addComment, deleteSelf }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(card.comments);
    const [show, setShow] = useState(false);
    const [state, dispatch] = useStateValue();
    const { user } = state;

    const handleCommentSubmit = async (e) => {
        if (e.code !== 'Enter') return;
        else {
            const newComment = {
                id: uuid(),
                content: comment,
                commenter: convertUser(user),
                createdAt: moment().toISOString(),
            };
            await addComment(newComment);
            setComments((comments) => [...comments, newComment]);
            setComment('');
        }
    };
    const handleDelete = async (e) => {
        await deleteSelf(card.id);
        setShow(false);
        closeModal();
    };
    return (
        <div>
            <Modal
                visible={visible}
                title={card?.title || ''}
                onCancel={closeModal}
                footer={null}
                width="1000px"
            >
                <div className="mb-5">
                    <div className="font-bold text-xl">Link paper: </div>
                    <a target="_blank" href={card.paperLink}>
                        {card.paperLink}
                    </a>
                </div>
                <div className="mb-5">
                    <div className="font-bold text-xl">Description: </div>
                    <div>{card.description}</div>
                </div>
                <div>
                    <div className="font-bold text-xl">Discussion</div>
                    <div className="flex gap-3 mt-3">
                        <img className="w-12 rounded-full" src={user?.photoURL} alt="" />
                        <Input
                            value={comment}
                            onKeyDown={handleCommentSubmit}
                            onChange={(e) => setComment(e.target.value)}
                            className="rounded-xl"
                            placeholder="Write a comment..."
                        />
                    </div>
                    <div>
                        {comments && comments.length > 0 ? (
                            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
                <hr></hr>
                <div className="mt-5 flex justify-content-center">
                    <Button
                        danger={true}
                        // onClick={setShow(true)}
                        onClick={handleDelete}
                    >
                        Delete Card
                    </Button>
                </div>
            </Modal>
            {/* <Modal
                visible={show}
                title={"Warning"}
                onCancel={() => setShow(true)}
                footer={null}
                width="600px"
            >
                <div className="font-bold text-xl">Are you sure to delete this card?</div>
                <div className="flex">
                    <Button
                        type={'primary'}
                        onClick={handleDelete}
                        className='float-left'
                    >
                        Confirm
                    </Button>
                    <Button
                        className='float-left'
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal> */}
        </div>
    );
};

export default CardModal;
