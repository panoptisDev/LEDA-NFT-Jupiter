import ActionLoaderComponent from '@components/action-loader/action-loader.component';
import Modal from 'react-bootstrap/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { withAuthProtection } from '../../../features/auth/store/auth.actions';
import { buyItem } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type Props = {
  handleModal: () => void;
};

export const BuyModal = ({ handleModal }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.ledaNft);
  const { selectedItem, isModalOpen } = useAppSelector((state) => state.marketplace);
  const { address } = useMetamask();

  const onSubmit = async () => {
    dispatch(
      withAuthProtection(
        buyItem({
          address,
          price: String(selectedItem.price),
          tokenId: selectedItem.tokenId,
          itemId: selectedItem.itemId,
          listId: selectedItem.listId,
        })
      )
    );
  };

  return (
    <div>
      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={isModalOpen}
        onHide={handleModal}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3 className="modal-title fw-light">
            Buy{' '}
            <span className="fw-bold">
              {selectedItem?.name} #{selectedItem?.tokenId}
            </span>{' '}
            NFT
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            You are about to purchase an NFT to{' '}
            <span className="fw-bold">{selectedItem.owner?.address}</span>{' '}
          </p>
          <div className="placebid-form-box">
            <div className="bit-continue-button">
              <ActionLoaderComponent
                isLoading={isLoading}
                onClick={onSubmit}
                buttonSize="medium"
                type="submit"
                buttonFullwidth
                label={`Buy NFT for ${selectedItem?.price} ETH`}
                labelLoading="Buying"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
