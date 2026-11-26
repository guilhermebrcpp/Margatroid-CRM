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
            <tr className="chamado_table_row">
                <td className="chamado_table_cell chamado_table_cell_title">{chamados_json[i]["titulo"]}</td>
                <td className="chamado_table_cell">{chamados_json[i]["descricao"]}</td>
                <td className="chamado_table_cell">{client_name}</td>
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
                    <h3>Lead</h3>
                    <div style={{border:"1px solid grey", borderRadius:"0.5rem", padding:"0.25rem", display:"flex", alignItems:"center", width:"30rem"}}>
                        <SearchRegular style={{fontSize:"1.5rem"}}/>
                        <input type="text" placeholder="Pesquisar Chamado" style={{border:"none", width:"auto"}}></input>
                    </div>
                    <br></br>
                    
                    <h3>Leads recentes</h3>
                    <div style={{display:"block"}}>
                        <div style={{display:"flex", border:"1px solid grey", borderRadius:"0.5rem", padding:"0.25rem", alignContent:"center", alignItems:"center"}}>
                            <p style={{textAlign:"left", marginBottom:"1rem", display:"block", marginRight:"0.5rem"}}>Total</p>
                            <p style={{display:"block"}}>{chamados_json.length}</p>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th style={{minWidth:"25rem", borderTopRightRadius:"0rem"}} className="chamados_table_header">Nome</th>
                            <th style={{minWidth:"60rem", borderTopRightRadius:"0rem", borderTopLeftRadius:"0rem"}} className="chamados_table_header">Descricao</th>
                            <th style={{minWidth:"15rem", borderTopLeftRadius:"0rem"}} className="chamados_table_header">Cliente</th>
                        </tr>
                        {chamados_table}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chamados;
