import React, { ReactElement, useState } from "react";
import {
	IonButton,
	IonButtons,
	IonHeader,
	IonIcon,
	IonMenuButton,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { globeOutline } from "ionicons/icons";

import ExtraCharactersModal from "../pages/modals/ExtraCharacters";
import { ModalPropsMaker } from "../store/types";

interface ModalProperties {
	title: string
	extraChars?: ModalPropsMaker
	startButtons?: ReactElement[]
	preEndButtons?: ReactElement[]
	endButtons?: ReactElement[]
	id?: string
	color?: string
	menu?: boolean
}

const Header = (props: ModalProperties) => {
	const {
		title,
		extraChars,
		menu = true,
		startButtons = [],
		preEndButtons = [],
		endButtons = [],
		id,
		color
	} = props;
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	return (
		<IonHeader id={id}>
			{extraChars ? <ExtraCharactersModal {...extraChars(isOpenECM, setIsOpenECM)} /> : <></>}
			<IonToolbar color={color}>
				<IonButtons slot="start">
					{menu ? <IonMenuButton /> : <></>}
					{startButtons}
				</IonButtons>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot="end">
					{preEndButtons}
					{extraChars ?
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
					:
						<></>
					}
					{endButtons}
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};

export default Header;
