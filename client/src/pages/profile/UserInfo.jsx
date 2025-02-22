import React, {useContext} from 'react';
import userIcon from '../../assets/user.png';
import {Context} from "../../index";
import {Button, Form, Image} from "react-bootstrap";
import {update} from "../../http/userAPI";
import {useNavigate} from "react-router-dom";
import logoutUser from "../../utils/logoutUser";
import {LOGIN_ROUTE} from "../../utils/consts";
import {jwtDecode} from "jwt-decode";

const UserInfo = () => {
    const {user} = useContext(Context);
    const [username, setUsername] = React.useState(user.user.username);
    const [email, setEmail] = React.useState(user.user.email);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const onSave = () => {
            update(username, email, password).then(data => {
                // update token in LS and mobX store
                localStorage.setItem('token', data.token);
                user.setUser(jwtDecode(data.token));
            }).catch(e => {
                setError(e?.response?.data?.message);
            });
    }
    const navigate = useNavigate();
    const onLogout = async () => {
        await logoutUser(false);
        navigate(LOGIN_ROUTE);
    }
    return (
        <div className="p-5">
            <div className="d-flex gap-4 align-items-center justify-content-center">
                <Image
                    src={userIcon}
                    width={120}
                    height={120}
                    style={{cursor: "pointer"}}
                />
                <strong
                    className="me-2">{username.length > 15 ? username.substring(0, 15) + '...' : username}
                </strong>
            </div>
            <div className="d-flex justify-content-center">
                <Form className="mt-4 d-flex gap-3 flex-column">
                    <Form.Group>
                        <div className="text-muted">Username</div>
                        <Form.Control
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{maxWidth: 300}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className="text-muted">Email</div>
                        <Form.Control
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{maxWidth: 300}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className="text-muted">Password</div>
                        <Form.Control
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{maxWidth: 300}}
                        />
                    </Form.Group>
                    <div style={{color: "red"}}>{error}</div>
                    <Button onClick={onSave} className="mt-4" variant={"outline-dark"}>Save Changes</Button>
                    <Button
                        variant={'outline-danger'}
                        className='mx-1'
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UserInfo;