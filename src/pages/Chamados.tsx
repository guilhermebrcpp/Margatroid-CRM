import { Link, useNavigate, useParams } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import ContactForm from "../components/ContactForm";
import { useContacts } from "../context/ContactsContext";
import { useEffect, useState } from "react";
import { SearchRegular } from "@fluentui/react-icons";

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
            <tr>
                <td>{chamados_json[i]["titulo"]}</td>
                <td>{chamados_json[i]["descricao"]}</td>
                <td>{client_name}</td>
            </tr>
        )
    }
    return table_lista;
}

async function return_chamados_json(){
    const url = "https://jaga-crm-back.vercel.app/api/chamado"
    const info = await fetch(url)
    const json = await info.json()

    return json;
}
function Chamados() {
    const [chamados_table, setChamadosTable] = useState<React.ReactNode>(null);
    const [chamados_json, setChamadosJson] = useState<any[]>([]);
    
    useEffect(() => {
        async function fetch_chamados_data(){
            const url = "https://jaga-crm-back.vercel.app/api/chamado";
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
                    <h3>Chamados</h3>
                    <div style={{border:"1px solid grey", borderRadius:"0.5rem", padding:"0.25rem", display:"flex", alignItems:"center", width:"30rem"}}>
                        <SearchRegular style={{fontSize:"1.5rem"}}/>
                        <input type="text" placeholder="Pesquisar Chamado" style={{border:"none", width:"auto"}}></input>
                    </div>
                    <br></br>
                    <div style={{display:"inline-block", border:"1px solid grey", borderRadius:"0.5rem", padding:"1rem", boxShadow:"4px 4px 10px grey"}}>
                        <h5 style={{textAlign:"left", marginBottom:"1rem"}}>Total</h5>
                        <h3>{chamados_json.length}</h3>
                    </div>
                    <br></br>
                    <br></br>
                    <h3>Chamados recentes</h3>
                    <table>
                        <tr>
                            <th style={{minWidth:"10rem"}}>Nome</th>
                            <th style={{minWidth:"20rem"}}>Descricao</th>
                            <th style={{minWidth:"10rem"}}>Cliente</th>
                        </tr>
                        {chamados_table}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chamados;
