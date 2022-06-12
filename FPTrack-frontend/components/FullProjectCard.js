import React, { useState } from 'react';
import styles from '../components/styles/FullProjectCard.module.css'
import userStyles from '../components/styles/UserCard.module.css'
import useCollapse from 'react-collapsed';
import Usercard from '../components/UserCard';
import useSWR from 'swr'
import Popup from 'reactjs-popup';
import { Document, Page } from 'react-pdf';



function Usercard_byid(props) {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR("http://localhost:3000/api/user/" + props.props, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <Usercard {...data[0]} />
    );
}
function Idlist_usercard(props) {
    console.log("IDlist", props);
    return (props.props.map(obj => {
        return <Usercard_byid props={obj} />;
    })
    );

}
function Members(props) {

    const config = {
        duration: 200
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

    return (<div className="collapsible">
        <div className="header" {...getToggleProps()}>
            <h1>{isExpanded ? 'Collapse Members' : 'Expand Members'}</h1>
        </div>
        <div {...getCollapseProps()}>
            <div style={{ display: "flex", "flex-direction": "row" }}>
                <Idlist_usercard props={props.props} />
            </div>
        </div>
    </div>);
}
function Leader(props) {

    const config = {
        duration: 200
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

    return (<div className="collapsible">
        <div className="header" {...getToggleProps()}>
            <h1>{isExpanded ? 'Collapse Leader' : 'Expand Leader'}</h1>
        </div>
        <div {...getCollapseProps()}>
            <div style={{ display: "flex", "flex-direction": "row" }}>
                <Idlist_usercard props={[props.props]} />
            </div>
        </div>
    </div>);
}


function Supervisors(props) {

    const config = {
        duration: 200
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

    return (<div className="collapsible">
        <div className="header" {...getToggleProps()}>
            <h1>{isExpanded ? 'Collapse Supervisors' : 'Expand Supervisors'}</h1>
        </div>
        <div {...getCollapseProps()}>
            <div style={{ display: "flex", "flex-direction": "row" }}>
                <Idlist_usercard props={[props.props]} />
            </div>
        </div>
    </div>);
}

export default function FullProject(props) {
    console.log("porps", props);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // convert array to base64 string (given pdf_document data)
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);

    }
    var res = arrayBufferToBase64(props.props.proposal.pdf_document.data);

    return (
        <div>
            <div><span>Title: </span>{props.props.proposal.title}</div>
            <div>Domain: {props.props.proposal.domains.map(obj => { return obj + ","; })}</div>
            <div><span>Budget requested: </span>{props.props.proposal.budget}</div>
            <div><span>Budget approved: </span>{props.props.approved_budget}</div>
            <div><span>Duration: </span>{props.props.approved_duration} months</div>
            <div>Proposal.pdf:</div>
            <div>
                <embed src={`data:application/pdf;base64,${res}`} width="500" height="500" />
            </div>
            <Leader props={props.props.proposal.leader} />
            <Members props={props.props.proposal.members} />
            <Supervisors props={props.props.proposal.supervisors} />
        </div>
    );

}