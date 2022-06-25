function calculaRotaColisao(tempoSeguro) {
    let xAux, yAux,
            xNew, yNew,
            d1, d2,
            t1, t2,
            tempoAbsDiferenca = 0,
            tan1, tan2;

    let hasColAux1 = false,
            hasColAux2 = false;

    aviso = "";

    for ( i = 0; i < planes.length; i++) {
        for ( j = i + 1; j < planes.length; j++) {
            hasColAux1 = false;
            hasColAux2 = false;
            if ((planes[i].direcao == planes[j].direcao)) {
                if (!isAnguloIgualComColisao(planes[i], planes[j])) {
                    aviso += "\nAvião " + (i + 1) + " -> " + "Avião " + (j + 1) + " Ângulo iguais e sem a existência de um ponto de colisão \n";
                }
            }

            tan1 = tan(planes[i].direcao);
            tan2 = tan(planes[j].direcao);

            xAux = (tan1 * -planes[i].x) + planes[i].y;
            yAux = (tan2 * -planes[j].x) + planes[j].y;

            if (planes[i].direcao == 90) {
                xCol = planes[i].x;
            } else {
                if (planes[j].direcao == 90) {
                    xCol = planes[j].x;
                } else {
                    xCol = ((yAux - xAux) / (tan1 + (-tan2)));
                }
            }

            if (planes[i].direcao == 180) {
                yCol = planes[i].y;
            } else {
                if (planes[j].direcao == 180) {
                    yCol = planes[j].y;
                } else {
                    yCol = (tan2 * xCol + yAux);
                }
            }
            
            //Validacao
            xNew = planes[i].x + (0.01 * cos(planes[i].direcao));
            yNew = planes[i].y + (0.01 * sin(planes[i].direcao));


            if (planes[i].x > xCol && xNew < planes[i].x) {
                hasColAux1 = true;
            } else {
                if (planes[i].x < xCol && xNew > planes[i].x) {
                    hasColAux1 = true;
                }
            }

            if (planes[i].y > yCol && yNew < planes[i].y) {
                hasColAux1 = true;
            } else {
                if (planes[i].y < yCol && yNew > planes[i].y) {
                    hasColAux1 = true;
                }
            }


            xNew = planes[j].x + (0.01 * cos(planes[j].direcao));
            yNew = planes[j].y + (0.01 * sin(planes[j].direcao));


            if (planes[j].x > xCol && xNew < planes[j].x) {
                hasColAux2 = true;
            } else {
                if (planes[j].x < xCol && xNew > planes[j].x) {
                    hasColAux2 = true;
                }
            }

            if (planes[j].y > yCol && yNew < planes[j].y) {
                hasColAux2 = true;
            } else {
                if (planes[j].y < yCol && yNew > planes[j].y) {
                    hasColAux2 = true;
                }
            }

            if (!hasColAux1 || !hasColAux2) {

                aviso += "\nAvião " + planes[i].id + " -> " + "Avião " + planes[j].id + " Não existe colisão \n";
                continue;
            }

            d1 = Math.hypot(xCol - planes[i].x,  yCol - planes[i].y);
            d2 = Math.hypot(xCol - planes[j].x,  yCol - planes[j].y);

            t1 = d1 / planes[i].velocidade;
            t2 = d2 / planes[j].velocidade;

            tempoAbsDiferenca = (Math.abs(t1 - t2) * 60 * 60);
            hasColision = tempoAbsDiferenca <= tempoSeguro;

            if (hasColision) {
                aviso += "Avião " + planes[i].id + " -> " + "Avião " + planes[j].id 
                        + "\nPonto de colisão: (" + xCol.toFixed(4) + ";" + yCol.toFixed(4) + ")"
                        + "\nDiferença de tempo: " + tempoAbsDiferenca.toFixed(4) + "s\n"
                        + "Avião " + planes[i].id + ": " + parseFloat((t1 * 60 * 60).toFixed(4)) + "s\n"
                        + "Avião " + planes[j].id + ": " + parseFloat((t2 * 60 * 60).toFixed(4)) + "s\n";
            }

        }
    }

    aviso += "\n";


    return aviso;
}

function isAnguloIgualComColisao( airplane1, airplane2) {
    if ((airplane1.direcao == 90 || airplane1.direcao == 270) && (airplane1.x == airplane2.x)) {
        return true;
    } else {
        return (airplane1.direcao == 180 || airplane1.direcao == 0) && (airplane1.y == airplane2.y);
    }
}

function disableButtonWithoutPlaneSelected() {
    const buttonAplicar = document.getElementById("aplicar_transformacao");
    const buttonDeletePlanes = document.getElementById("btn-delete-planes");
    if (planes.filter((plane) => plane.selected).length) {
        buttonAplicar.disabled = false;
    } else {
        buttonAplicar.disabled = true;
    }

    if(planes.length){
        buttonDeletePlanes.disabled = false;
    } else {
        buttonDeletePlanes.disabled = true;    
    }
}
  
function cleanInputsFormInserir() {
    document.getElementById("inserir").reset();
}

function onChangeModoInserir(){
    const optionInserir = document.getElementById("option_modo_inserir");
    switch (true) {
      case optionInserir.value === 'CARTESIANO':
        document.querySelector("#raio").value = 0;
        document.querySelector("#angle").value = 0;

        document.querySelector("#x").readOnly = false;
        document.querySelector("#y").readOnly = false;

        document.querySelector("#raio").readOnly =  true;
        document.querySelector("#angle").readOnly = true;
        break;

      case optionInserir.value === 'POLAR':
        document.querySelector("#x").value = 0;
        document.querySelector("#y").value = 0;

        document.querySelector("#raio").readOnly =  false;
        document.querySelector("#angle").readOnly = false;

        document.querySelector("#x").readOnly = true;
        document.querySelector("#y").readOnly = true;
        break;

      default:
        document.querySelector("#x").value = 0;
        document.querySelector("#y").value = 0;
        document.querySelector("#raio").value =  0;
        document.querySelector("#angle").value = 0;

        document.querySelector("#raio").readOnly =  false;
        document.querySelector("#angle").readOnly = false;
        document.querySelector("#x").readOnly = false;
        document.querySelector("#y").readOnly = false;
        break;
    }
}