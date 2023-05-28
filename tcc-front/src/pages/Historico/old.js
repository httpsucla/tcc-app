gerarRelatorio = () => {
    const lastMed = [];
    let totalArray = 0;

    medicamentos.forEach((medicamento) => {
        const dateObj = new Date(medicamento.data_inicial) // transforma a data inicial em Date
        const timeObj = new Date(`1970-01-01T${medicamento.horario}000Z`); // transforma o horario inicial em date
        const now = new Date();
        const agora = moment(now);

        const mediaHoras = 24 / (parseInt(medicamento.qtde) / parseInt(medicamento.qtde_dias)); // calcula de quanto em quanto tempo deve-se engerir o medicamento
        let horarioProximo = moment(new Date(dateObj.setHours(timeObj.getHours(), timeObj.getMinutes(), timeObj.getSeconds())));

        for (let i = 0; i < medicamento.qtde; i++) {
            if (horarioProximo.isBefore(agora)) {
                lastMed.push({ // cria objeto com o horario mais proximo de cada medicamento 
                    id: totalArray + i,
                    title: medicamento.nome,
                    dataAtual: moment.utc(horarioProximo),
                    horario: String(moment.utc(horarioProximo).format("DD/MM/YY HH:mm")),
                    abertura: ""
                });
                horarioProximo.add(mediaHoras, 'hours'); // calcula os futuros horarios que o usuario deverá tomar o medicamento
            }
        }
        totalArray = lastMed.length;
    });

    lastMed.sort((a, b) => { // ordena a lista por ordem crescente de data
        const dataA = new Date(a.dataAtual);
        const dataB = new Date(b.dataAtual);
        if (dataA < dataB) {
            return -1;
        } else if (dataA > dataB) {
            return 1;
        } else {
            return 0;
        }
    });
    setListaMed(lastMed);
}





filtrarRelatorio = () => {
    console.log(filtro)
    if (filtro) {
        if (medId) {
            if (dataStart) {
                if (dataEnd) {
                    console.log("medicamento inicio e fim existem");
                    Database.getMedicamentoDataFimHistorico(medId, dataStart, dataEnd, (historico) => {
                        setHistorico(historico);
                    });
                } else {
                    console.log("medicamento e data inicio existe");
                    Database.getMedicamentoDataInicioHistorico(medId, dataStart, (historico) => {
                        setHistorico(historico);
                    });
                }
            }
            else if (dataEnd) {
                console.log("medicamento e data fim existe");
                Database.getMedicamentoDataFimHistorico(medId, dataEnd, (historico) => {
                    setHistorico(historico);
                });
            } else {
                console.log("só medicamento")
                Database.getMedicamentoHistorico(medId, () => {

                });
            }
        }
        else if (dataStart) {
            if (dataEnd) {
                console.log("data inicio e data fim existe");
                Database.getInicioFimHistorico(dataStart, dataEnd, (historico) => {
                    setHistorico(historico);
                });
            } else {
                console.log("só data inicio existe");
                Database.getDataInicioHistorico(dataStart, (historico) => {
                    setHistorico(historico);
                });
            }
        } else {
            console.log("só data fim existe");
            Database.getDataFimHistorico(dataEnd, (historico) => {
                setHistorico(historico);
            });
        }
    }
}



formatRelatorio = () => {
    const lista = [];

    // Object.keys(historico).forEach((hist, key) => {
    //     lista.push({
    //         key: key,
    //         nome : hist.nome[index],
    //         dt_prevista : moment(hist.dt_prevista[index],'YYYY-MM-DD HH:mm').format('DD/MM HH:mm'),
    //         dt_abertura : moment(hist.dt_abertura[index],'YYYY-MM-DD HH:mm').format('DD/MM HH:mm')
    //     })
    // });

    // const result = historico.map((hist, index) => ({
    //     ...hist, 
    //     nome : nome[index],
    //     dt_prevista : dt_prevista[index],
    //     dt_abertura: dt_abertura[index]
    // }));

    historico.forEach((hist, index) => {
        hist.nome = hist.nome[index];
        hist.dt_prevista = moment(hist.dt_prevista[index],'YYYY-MM-DD HH:mm').format('DD/MM HH:mm');
        hist.dt_abertura = moment(hist.dt_abertura[index],'YYYY-MM-DD HH:mm').format('DD/MM HH:mm');
    });
    console.log('chegou na lista', historico);
    // setHistorico(result);

    
}