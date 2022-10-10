import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import ShareDropdown from '@components/share-dropdown';
import ShareModal from '@components/modals/share-modal';
import Anchor from '@ui/anchor';
import { Author } from '@types';

type Props = {
  className?: string;
  space?: number;
  data: Author;
  address: string;
};

const AuthorIntroArea = ({ className, space = 1, data, address }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
  return (
    <>
      <ShareModal show={isShareModalOpen} handleModal={shareModalHandler} />
      <div className="rn-author-bg-area position-relative ptb--150">
        <Image
          src="/images/bg/bg-image-9.jpg"
          alt="Slider BG"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className={clsx('rn-author-area', space === 1 && 'mb--30 mt_dec--120', className)}>
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper">
                <div className="author-inner">
                  {data?.image?.src && (
                    <div className="user-thumbnail">
                      <Image
                        src={data.image.src}
                        alt={data.image?.alt || data.name}
                        width={140}
                        height={140}
                        layout="fixed"
                      />
                    </div>
                  )}

                  <div className="rn-author-info-content">
                    <h4 className="title">{address}</h4>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="social-follw"
                    >
                      <i className="feather-twitter" />
                      <span className="user-name">{data.twitter}</span>
                    </a>
                    <div className="follow-area">
                      <div className="follow followers">
                        <span>
                          {data.followers}{' '}
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="color-body"
                          >
                            followers
                          </a>
                        </span>
                      </div>
                      <div className="follow following">
                        <span>
                          {data.following}{' '}
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="color-body"
                          >
                            following
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="author-button-area">
                      <span className="btn at-follw follow-button">
                        <i className="feather-user-plus" />
                        Follow
                      </span>
                      <button
                        type="button"
                        className="btn at-follw share-button"
                        onClick={shareModalHandler}
                      >
                        <i className="feather-share-2" />
                      </button>

                      <div className="count at-follw">
                        <ShareDropdown />
                      </div>
                      <Anchor path="/edit-profile" className="btn at-follw follow-button edit-btn">
                        <i className="feather feather-edit" />
                      </Anchor>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorIntroArea;
