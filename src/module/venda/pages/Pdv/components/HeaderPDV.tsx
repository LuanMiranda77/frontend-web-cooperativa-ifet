import React from "react";
import { FaIdCardAlt, FaTeamspeak } from "react-icons/fa";
import { UserAplicationType } from "../../../../../domain";
interface Props {
  theme: any;
  actualUser: UserAplicationType;
}

export const HeaderPDV: React.FC<Props> = ({ ...props }) => {
  const { theme, actualUser } = props;
  return (
    <header>
      <div className="flex items-center text-left font-bold text-xs" style={{ color: theme.colors.textLabel }}>
        <FaTeamspeak className="text-3xl mr-2" />
        <div>
          <p>SUPORTE</p>
          <p style={{ color: theme.colors.warning }}>83 99638-6694</p>
        </div>
      </div>
      <div className="flex  items-center font-bold" style={{ color: theme.colors.textLabel }}>
        {/* <div className="flex text-right items-center text-xs cursor-pointer">
          <div className="mr-2">
            <p>CONSUMIDOR</p>
            <p style={{ color: theme.colors.success }}>{actualUser.name}</p>
          </div>
          <FaUserTie className="text-3xl" />
        </div> */}
        <div className="linha-vertical h-10 m-2"></div>
        <div className="flex text-left items-center text-xs cursor-pointer">
          <FaIdCardAlt className="text-3xl mr-2" />
          <div>
            <p>VENDEDOR</p>
            <p style={{ color: theme.colors.warning }}>{actualUser.name}</p>
          </div>
        </div>
        <div className="text-center font-bold text-xl ml-32">
          <p>CAIXA</p>
          <p>01</p>
        </div>
      </div>
    </header>
  );
};
