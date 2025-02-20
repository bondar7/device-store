import React, {useContext} from 'react';
import {Card, Image} from "react-bootstrap";
import {Context} from "../../index";
import userIcon from "../../assets/user-simple.png"
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/consts";

const ProfileCard = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    return (
        <div>
           <h5 className="px-2 fw-medium">Your contact details</h5>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex gap-4 align-items-center">
                            <Image src={userIcon} width={20} height={20}/>
                            <div>{user.user.email}</div>
                        </div>
                        <div>
                            <a
                                style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}
                                onClick={() => navigate(PROFILE_ROUTE)}
                            >
                                More
                            </a>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfileCard;