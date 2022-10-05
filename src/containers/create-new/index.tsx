import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import Button from '@ui/button';
import ProductModal from '@components/modals/product-modal';
import ErrorText from '@ui/error-text';
import { toast } from 'react-toastify';
import { Product } from '@types';
import Image from 'next/image';
import createNft from '../../features/leda-nft/store/leda-nft.actions';
import useAppDispatch from '../../store/hooks/useAppDispatch';

type Props = {
  className?: string;
  space: number;
};

const CreateNewArea = ({ className, space }: Props) => {
  const dispatch = useAppDispatch();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [previewData, setPreviewData] = useState({} as Product);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    mode: 'onChange',
  });

  const notify = () => toast('Your product has submitted');
  const handleProductModal = () => {
    setShowProductModal(false);
  };

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = (data: Product, e: any) => {
    const { target } = e;
    const submitBtn = target.localName === 'span' ? target.parentElement : target;
    const isPreviewBtn = submitBtn.dataset?.btn;
    setHasImageError(!selectedImage);
    if (isPreviewBtn && selectedImage) {
      setPreviewData({ ...data, blob: selectedImage });
      setShowProductModal(true);
    }
    if (!isPreviewBtn && selectedImage) {
      dispatch(createNft({ ...data, blob: selectedImage } as Product));
      notify();
      reset();
      setSelectedImage(null);
    }
  };

  return (
    <>
      <div className={clsx('create-area', space === 1 && 'rn-section-gapTop', className)}>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                <div className="upload-area">
                  <div className="upload-formate mb--30">
                    <h6 className="title">Upload file</h6>
                    <p className="formate">Drag or choose your file to upload</p>
                  </div>

                  <div className="brows-file-wrapper">
                    <input
                      name="file"
                      id="file"
                      type="file"
                      className="inputfile"
                      data-multiple-caption="{count} files selected"
                      multiple
                      onChange={imageChange}
                    />
                    {selectedImage && (
                      <Image
                        id="createfileImage"
                        src={URL.createObjectURL(selectedImage)}
                        alt=""
                        data-black-overlay="6"
                        layout="fill"
                      />
                    )}

                    <label htmlFor="file" title="No File Choosen">
                      <i className="feather-upload" />
                      <span className="text-center">Choose a File</span>
                      <p className="text-center mt--10">
                        PNG, GIF, WEBP, MP4 or MP3. <br /> Max 1Gb.
                      </p>
                    </label>
                  </div>
                  {hasImageError && !selectedImage && <ErrorText>Image is required</ErrorText>}
                </div>

                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                  <h5> Note: </h5>
                  <span>
                    {' '}
                    Service fee : <strong>2.5%</strong>{' '}
                  </span>{' '}
                  <br />
                  <span>
                    {' '}
                    You will receive : <strong>25.00 ETH $50,000</strong>
                  </span>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="form-wrapper-one">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-box pb--20">
                        <label htmlFor="name" className="form-label">
                          Product Name
                        </label>
                        <input
                          id="name"
                          placeholder="e. g. `Digital Awesome Game`"
                          {...register('name', {
                            required: 'Name is required',
                          })}
                        />
                        {errors.name && errors.name.message && (
                          <ErrorText>{errors.name.message}</ErrorText>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="input-box pb--20">
                        <label htmlFor="Discription" className="form-label">
                          Discription
                        </label>
                        <textarea
                          id="discription"
                          rows={3}
                          placeholder="e. g. “After purchasing the product you can get item...”"
                          {...register('discription', {
                            required: 'Discription is required',
                          })}
                        />
                        {errors.discription && errors.discription.message && (
                          <ErrorText>{errors.discription.message}</ErrorText>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="input-box pb--20">
                        <label htmlFor="price" className="form-label">
                          Item Price in $
                        </label>
                        <input
                          id="price"
                          placeholder="e. g. `20$`"
                          {...register('price', {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: 'Please enter a number',
                            },
                            required: 'Price is required',
                          })}
                        />
                        {errors.price && errors.price.message && (
                          <ErrorText>{errors.price.message}</ErrorText>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="input-box pb--20">
                        <label htmlFor="Size" className="form-label">
                          Size
                        </label>
                        <input
                          id="size"
                          placeholder="e. g. `Size`"
                          {...register('size', {
                            required: 'Size is required',
                          })}
                        />
                        {errors.size && errors.size.message && (
                          <ErrorText>{errors.size.message}</ErrorText>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="input-box pb--20">
                        <label htmlFor="Propertie" className="form-label">
                          Properties
                        </label>
                        <input
                          id="propertiy"
                          placeholder="e. g. `Propertie`"
                          {...register('property', {
                            required: 'Propertiy is required',
                          })}
                        />
                        {errors.property && errors.property?.message && (
                          <ErrorText>{errors.property.message}</ErrorText>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="input-box pb--20">
                        <label htmlFor="Royalty" className="form-label">
                          Royalty
                        </label>
                        <input
                          id="royalty"
                          placeholder="e. g. `20%`"
                          {...register('royalty', {
                            required: 'Royalty is required',
                          })}
                        />
                        {errors.royalty && errors.royalty.message && (
                          <ErrorText>{errors.royalty.message}</ErrorText>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div className="input-box pb--20 rn-check-box">
                        <input className="rn-check-box-input" type="checkbox" id="putonsale" />
                        <label className="rn-check-box-label" htmlFor="putonsale">
                          Put on Sale
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div className="input-box pb--20 rn-check-box">
                        <input
                          className="rn-check-box-input"
                          type="checkbox"
                          id="instantsaleprice"
                        />
                        <label className="rn-check-box-label" htmlFor="instantsaleprice">
                          Instant Sale Price
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div className="input-box pb--20 rn-check-box">
                        <input
                          className="rn-check-box-input"
                          type="checkbox"
                          id="unlockpurchased"
                        />
                        <label className="rn-check-box-label" htmlFor="unlockpurchased">
                          Unlock Purchased
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12 col-xl-4">
                      <div className="input-box">
                        <Button
                          color="primary-alta"
                          fullwidth
                          type="submit"
                          data-btn="preview"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Preview
                        </Button>
                      </div>
                    </div>

                    <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                      <div className="input-box">
                        <Button type="submit" fullwidth>
                          Submit Item
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                <h5> Note: </h5>
                <span>
                  {' '}
                  Service fee : <strong>2.5%</strong>{' '}
                </span>{' '}
                <br />
                <span>
                  {' '}
                  You will receive : <strong>25.00 ETH $50,000</strong>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showProductModal && (
        <ProductModal show={showProductModal} handleModal={handleProductModal} data={previewData} />
      )}
    </>
  );
};

CreateNewArea.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
  space: 1,
};

export default CreateNewArea;
