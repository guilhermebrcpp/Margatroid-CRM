import { Link, useNavigate, useParams } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import ContactForm from "../components/ContactForm";
import { useContacts } from "../context/ContactsContext";
import { useEffect, useState } from "react";
import { SearchRegular } from "@fluentui/react-icons";

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

async function return_all_chamados_tags(chamados_json: any){
    //const url = "https://jaga-crm-back.vercel.app/api/chamado"
    //const info = await fetch(url)
    //const json = await info.json()
    const table_lista = [];

    for(let i = 0; i < chamados_json.length; i++){
        const url_client = "https://jaga-crm-back.vercel.app/api/cliente/" + chamados_json[i]["cnpj_cliente"];
        const info_client = await fetch(url_client)
        const json_client = await info_client.json()
        const client_name = json_client[0]["nome"]
        
        table_lista.push(
            <tr className="chamado_table_row">
                <td className="chamado_table_cell chamado_table_cell_title" style={{minWidth:"15rem"}}>{chamados_json[i]["titulo"]}</td>
                <td className="chamado_table_cell" style={{minWidth:"65rem"}}>{chamados_json[i]["descricao"]}</td>
                <td className="chamado_table_cell" style={{minWidth:"13rem"}}>{client_name}</td>
                <td className="chamado_table_cell" style={{minWidth:"6.5rem"}}>{formatDate(new Date(chamados_json[0]["created_at"]))}</td>
            </tr>
        )
    }
    return table_lista;
}

async function return_chamados_json(){
    const url = "https://jaga-crm-back.vercel.app/api/projeto"
    const info = await fetch(url)
    const json = await info.json()

    return json;
}

function Chamados() {
    const [chamados_table, setChamadosTable] = useState<React.ReactNode>(null);
    const [chamados_json, setChamadosJson] = useState<any[]>([]);
    
    useEffect(() => {
        async function fetch_chamados_data(){
            const url = "https://jaga-crm-back.vercel.app/api/projeto";
            const info = await fetch(url);
            const json = await info.json();
            
            setChamadosJson(await return_chamados_json());
            
            setChamadosTable(return_all_chamados_tags(json));
        }
        fetch_chamados_data();
    }, []);

    return(
        <div>
            <DashBoard></DashBoard>
            <div style={{overflow:"auto", height:"100vh", padding:"2rem", paddingTop:"1rem"}}>
                <div>
                    <h3>Projetos</h3>
                    <div style={{border:"1px solid grey", borderRadius:"0.5rem", padding:"0.25rem", display:"flex", alignItems:"center", width:"30rem"}}>
                        <SearchRegular style={{fontSize:"1.5rem"}}/>
                        <input type="text" placeholder="Pesquisar projetos" style={{border:"none", width:"auto"}}></input>
                    </div>
                    <br></br>
                    
                    <h3>Projetos recentes</h3>
                    <div style={{display:"flex"}}>
                        <div style={{display:"block"}}>
                            <div style={{display:"flex", width:"15rem", cursor:"pointer", marginRight:"0.25rem", padding:"0.5rem 0.75rem 0.5rem 0.75rem", border:"1px solid grey", borderRadius:"0.5rem 0.5rem 0rem 0rem", alignContent:"center", alignItems:"center"}}>
                                <p style={{display:"block", textAlign:"left", marginBottom:"0rem", marginRight:"1rem", fontWeight:"600"}}>Total</p>
                                <p style={{display:"block", marginBottom:"0rem"}}>{chamados_json.length}</p>
                            </div>
                        </div>
                        {/*<button style={{marginLeft:"auto"}}>
                            +
                        </button>*/}
                    </div>
                    <table>
                        <tr>
                            {/*
                            <th style={{minWidth:"25rem", borderRadius:"0rem"}} className="chamados_table_header">Nome</th>
                            <th style={{minWidth:"50rem", borderTopRightRadius:"0rem", borderTopLeftRadius:"0rem"}} className="chamados_table_header">Descricao</th>
                            <th style={{minWidth:"15rem", borderTopRightRadius:"0rem", borderTopLeftRadius:"0rem"}} className="chamados_table_header">Cliente</th>
                            <th style={{minWidth:"10rem", borderTopLeftRadius:"0rem"}} className="chamados_table_header">Criado em</th>
                            */}
                            </tr>
                        {chamados_table}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chamados;
