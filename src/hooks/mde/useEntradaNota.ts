import _ from "lodash";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { MdeType, mdeInitialState } from "../../domain/types/nfe_entrada";
import { ErrorImport } from "../../module/estoque/pages/Mde/__mooks";
import { MdeService } from "../../module/estoque/pages/services/MdeService";
import { DowloadService } from "../../module/services/dowloadDoc";
import { UploadService } from "../../module/services/uploadDoc";
import { selectStateEstab } from "../../store/slices/estabelecimento.slice";
import { UtilsGeral } from "../../utils/utils_geral";

export default function useEntradaNota() {
  const estabelecimento = useSelector(selectStateEstab);
  const { title, colors } = useContext(ThemeContext);
  const [showModalEntrada, setShowModalEntrada] = useState(false);
  const [showPopupInfo, setShowPopupInfo] = useState(false);
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [tamanhoIpuntCnpjCpf, setTamanhoIpuntCnpjCpf] = useState(0);
  const [tipoNota, setTipoNota] = useState(0);
  const [notaSelect, setNotaSelect] = useState<MdeType>(mdeInitialState);
  const [selectRow, setSelectRow] = useState<any>();
  const [arrayErro, setArrayErro] = useState<Array<ErrorImport>>([]);
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [dataSourceCopy, setDataSourceCopy] = useState(dataSource);

  useEffect(() => {
    if (estabelecimento.id) {
      let dtIni = moment().subtract(1000, "days").format("YYYY-MM-DD");
      let dtFin = moment().format("YYYY-MM-DD");
      MdeService.getList({
        estabelecimento: estabelecimento.id,
        dtIni: dtIni,
        dtFin: dtFin,
        tipo: 1,
      })
        .then((resp) => {
          setDataSource(resp.data);
          setDataSourceCopy(resp.data);
        })
        .catch((error) => {
          toast.error(error.mensagemUsuario);
        });
    }
  }, [estabelecimento]);

  const actionNota = (nota: any) => {
    let compra = nota.data;
    if (compra.status === "A") {
      // toast.success('Nota cancelada');
    } else if (compra.status === "P") {
      // toast.success('Nota autorizada');
    } else {
      // toast.error('Não é possivel autorizar uma nota cancelada');
      return;
    }
  };

  const filterStatus = (status: string) => {
    if (status !== "") {
      let notas = dataSourceCopy;
      if (status === "E") {
        notas = dataSourceCopy.filter((e) => {
          if (e.incluida !== "N") {
            return e;
          }
        });
      } else {
        notas = _.filter(dataSourceCopy, { status: status });
      }
      setDataSource(notas);
    } else {
      setDataSource(dataSourceCopy);
    }
  };

  const onTesteCnpjCpf = (e: string) => {
    console.log(e);
    if (e !== undefined) {
      setTamanhoIpuntCnpjCpf(e.length);
    }
  };

  const onManifestar = () => {
    if (!notaSelect) {
      toast.error("Selecione uma nota para realizar o manifesto.");
      return;
    } else if (notaSelect.status === "A") {
      toast.error("Nota de entrada avulsa não pode ser manifestada.");
      return;
    } else if (notaSelect.status === "M") {
      toast.error("Nota já manifestada não é possivel o manifesto novamente.");
      return;
    }
    if (estabelecimento.id) {
      DowloadService.get(
        "33220200074569000100550100003043831231851691",
        "xml",
        estabelecimento.id
      );
    }
  };

  const uploadXml = (files: FileList | null) => {
    let arrayErros: ErrorImport[] = [];
    if (files && files.length <= 20) {
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        if (file) {
          if (file.size / 1024 > 2048) {
            toast.error(
              "Operação cancelada: pemitido aquivos de até 2 mega, aquivo:" +
                file.name +
                " maior que 2 mega"
            );
            return;
          }
          UploadService.post(estabelecimento, file)
            .then((resp) => {
              let array = [...dataSource];
              console.log(resp.data);
              array.push({ ...resp.data });
              setDataSource(array);
              setDataSourceCopy(array);
            })
            .catch((err) => {
              let erro = err.response.data.message.split("&");
              if (files.length === 1) {
                toast.error(UtilsGeral.getEmoji(2) + erro[0]);
              } else {
                let obj = {} as ErrorImport;
                obj.id = i + 1;
                obj.error = erro[0];
                obj.cnpjCpf = erro[1];
                obj.nome = erro[2];
                obj.chave = erro[3];
                obj.valor = erro[4];
                obj.dateEmisao = erro[5];

                arrayErros.push(obj);
                setArrayErro([...arrayErros]);
                setShowPopupInfo(true);
              }
            });
        }
      }
    } else {
      toast.info(
        "Operação cancelada: permitido apenas 20 xmls de até 2mb cada."
      );
    }
  };

  const onNovo = () => {
    setNotaSelect(mdeInitialState);
    setTipoNota(0);
    setShowModalEntrada(true);
  };

  const onEntadaMde = (mde: any) => {
    setTipoNota(1);
    setNotaSelect({ ...mde });
    setShowModalEntrada(true);
  };

  return {
    estabelecimento,
    title,
    colors,
    showModalEntrada,
    setShowModalEntrada,
    showPopupInfo,
    setShowPopupInfo,
    showModalFiltro,
    setShowModalFiltro,
    tamanhoIpuntCnpjCpf,
    setTamanhoIpuntCnpjCpf,
    tipoNota,
    setTipoNota,
    notaSelect,
    setNotaSelect,
    selectRow,
    setSelectRow,
    arrayErro,
    setArrayErro,
    dataSource,
    setDataSource,
    dataSourceCopy,
    setDataSourceCopy,
    uploadXml,
    onManifestar,
    filterStatus,
    actionNota,
    onEntadaMde,
    onNovo
    
  };
}
