import React, { useState } from "react";
import './styles/review.css';

const Review = (props) => {
    const [send, setSend] = useState(false);
    const [sendableData, setSendableData] = useState({ sendable: true, error: null });

    const date = new Date().toLocaleDateString().split('/');

    const addreview = async (props) => {
        const name = await document.querySelector("#review-name").value;
        const review = await document.querySelector("#review-body").value;

        if (name.length <= 5) {
            setSendableData({ sendable: false, error: "Name too short.👻" });
            return null;
        } else {
            if (review.length <= 10) {
                setSendableData({ sendable: false, error: "Review too short.🐒" });
                return null;
            } else if (name.length >= 5 && review.length >= 10) {
                await fetch(`https://3d-threejs-server.vercel.app/api/addreview/${props.match.params.page}`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "user_name": name,
                        "ip_address": "123.123.123",
                        "time": new Date().toLocaleTimeString(),
                        "date": new Date().toLocaleDateString(),
                        "review": review
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        setSend(true);
                    });
                return true;
            } else {
                setSendableData({ sendable: false, error: "Name and review are short.👻" });
                return null;
            }
        }
    }
    return (
        <main className="center">
            {
                (window.innerWidth >= 450) ?
                    <aside className="left-side center">
                        {/* <div className="lhs-div center" style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                        </div> */}
                    </aside> : null
            }
            <center className="middle center">
                <section className="card center">
                    <form className="review-form center" style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
                        <input type="text" placeholder="Whats your name?" id="review-name" name="review-name" autoComplete="off" />
                        {
                            sendableData.sendable ?
                                null :
                                <div className="review-error center" style={{ justifyContent: "flex-start" }}>
                                    <span className="review-form-error" for="review-body">{sendableData.error}</span>
                                </div>
                        }
                        <textarea type="textarea" placeholder="Review" id="review-body" name="review-body" autoComplete="off" />
                    </form>
                    <article className="review-form-article">
                        <article className="name-article center" style={{ justifyContent: "flex-start" }}>
                            <span className="name-article-text review-text">REVIEW</span>
                            <span className="name-article-text review-page-text"> {props.match.params.page.toUpperCase()}</span>
                        </article>
                        <footer className="review-form-footer center" style={{ flexDirection: "row" }}>
                            <aside className="review-form-footer-left center" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                <span className="review-form-date-text">{date[2]}/{date[1]}/{date[0]}</span>
                                <span className="review-form-designer-text">CODED BY TANISHQ</span>
                            </aside>
                            <aside className="review-form-footer-right center">
                                {
                                    send ?
                                        <span className="review-form-extra-text">&ensp;DONE&ensp;</span> :
                                        <span className="review-form-extra-text" onClick={() => addreview(props)}>SUBMIT</span>
                                }
                            </aside>
                        </footer>
                    </article>
                </section>
            </center>
            {
                (window.innerWidth >= 450) ?
                    <aside className="right-side center">
                        {/* <div className="rhs-div center" style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                            <span id="rhs-side-text">hello</span>
                        </div> */}
                    </aside> : null
            }
        </main>
    )
}

export default Review;