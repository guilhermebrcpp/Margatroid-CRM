import DashBoard from "../components/DashBoard";
import pfp from "../assets/pfp.png"
import {Line, Bar, Pie} from "react-chartjs-2";
import "../context/ContactsContext.tsx";
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    BarElement,
    Title, 
    Tooltip, 
    Legend,
    ArcElement
} from "chart.js"
import { ContactsProvider, useContacts } from "../context/ContactsContext.tsx";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    ArcElement,
    BarElement,
    Title, 
    Tooltip, 
    Legend
);

const data = {
  labels: ['Website', 'Sistema de Gestão', 'Segurança'],
  datasets: [
    {
      label: '# de projetos',
      data: [19, 12, 3],
      backgroundColor: [
        'rgb(43, 145, 213)',
        'rgb(255, 207, 86)',
        'rgb(255, 99, 133)',
      ]
    },
  ],
};

/*
let dataLine = {
  labels: ['Julho', "Agosto", "Setembro", "Outubro"],
  datasets: [
    {
      label: 'Clientes Novos',
      data: [5, 12, 8, 6],
      backgroundColor: [
        'rgb(43, 145, 213)'
      ]
    },
  ],
};*/

async function teste_api(){
    const url = "https://pokeapi.co/api/v2/pokemon/gengar"
    const info = await fetch(url)
    const json = await info.json()
    //alert(json["id"])
    return json["id"]
}

import { ArrowSprintRegular } from '@fluentui/react-icons';

async function return_all_projects_tags(){
    const url = "https://jaga-crm-back.vercel.app/api/projeto"
    const info = await fetch(url)
    const json = await info.json()
    const table_lista = [];
    
    for(let i = 0; i < json.length; i++){
        const url_client = "https://jaga-crm-back.vercel.app/api/cliente/" + json[i]["cnpj_cliente"];
        const info_client = await fetch(url_client)
        const json_client = await info_client.json()
        const client_name = json_client[0]["nome"]
        
        table_lista.push(
            <tr>
                <td>{json[i]["titulo"]}</td>
                <td>{client_name}</td>
                <td>a definir</td>
                <td>a definir</td>
                <td>a definir</td>
            </tr>
        )
    }
    return table_lista;
}

function HomePage(){
    const [dataLine, setDataLine] = useState({
        labels: ['teste', "teste", "teste", "teste"],
        datasets: [
            {
            label: 'Clientes Novos',
            data: [1, 2, 3, 4],
            backgroundColor: [
                'rgb(43, 145, 213)'
            ]
            },
        ],
        });


    const [projects_table, setProjectsTable] = useState<React.ReactNode>(null);

    useEffect(() => {
        async function merda(){
            const url = "https://pokeapi.co/api/v2/pokemon/pikachu"
            const info = await fetch(url)
            const json = await info.json()

            setDataLine({
            labels: ['Julho', "Agosto", "Setembro", "Outubro"],
            datasets: [
                {
                label: 'Clientes Novos',
                data: [json["id"], 12, 8, 6],
                backgroundColor: [
                    'rgb(43, 145, 213)'
                ]
                },
            ],
            })
        }

        merda();
        setProjectsTable(
        return_all_projects_tags()
        );
    }, []);

    const {contacts} = useContacts();
    const frase = contacts[0].name;
    const clients_total_count = contacts.length;
    return(
        <div>
            <ContactsProvider>
                <DashBoard></DashBoard>
                <div style={{overflow:"auto", height:"100vh", padding:"2rem", paddingTop:"1rem"}}>
                    <div style={{display:"flex", marginBottom:"1rem"}}>
                        <div>
                            <h3>Dashboard</h3>
                            <p>Bem vindo à Dashboard, onde você encontra uma visão geral do seu negócio, com gráficos, métricas e informações essenciais em um só lugar.</p>
                        </div>
                        <div style={{marginLeft:"auto", display:"flex"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <img src={pfp} height="65rem"></img>
                                <p style={{margin:"0rem", marginLeft:"0.5rem"}}>Usuario</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div style={{border:"1px solid grey", borderRadius:"0.5rem", padding:"1rem", boxShadow:"4px 4px 10px grey"}}>
                                <h3 style={{textAlign:"left", marginBottom:"1rem"}}>Projetos recentes</h3>
                                <table>
                                    <tr>
                                        <th style={{minWidth:"10rem"}}>Projeto</th>
                                        <th style={{minWidth:"10rem"}}>Cliente</th>
                                        <th style={{minWidth:"10rem"}}>Tipo</th>
                                        <th style={{minWidth:"10rem"}}>Prazo</th>
                                        <th style={{minWidth:"10rem"}}>Status</th>
                                    </tr>
                                    {projects_table}
                                </table>
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{border: "1px solid grey", borderRadius:"0.5rem", padding:"1rem" , boxShadow:"4px 4px 10px grey"}}>
                                <h3 style={{textAlign:"left"}}>Tipos de Projeto</h3>
                                <div style={{width:"25rem", height:"15rem", margin:"0 auto"}}>
                                    <Pie data={data} options={{maintainAspectRatio: false, plugins: { legend: { position: 'right' }}}}></Pie>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div>
                                <h3 style={{textAlign:"center"}}>Chamados novos por mês</h3>
                                <div style={{width:"30rem", height:"15rem", margin:"0 auto", aspectRatio: 1}}>
                                    <Bar data={dataLine}></Bar>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    
                </div>
            </ContactsProvider>
        </div>
    );
}

export default HomePage;