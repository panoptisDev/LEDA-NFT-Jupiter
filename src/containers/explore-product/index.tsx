import clsx from 'clsx';
import Item from '@components/item';
import { Item as ItemType } from '@types';

type Props = {
  className?: string;
  space?: number | 1 | 2;
  items: ItemType[];
};

const ProductArea = ({ className, space, items }: Props) => (
  <div className={clsx('rn-product-area', space === 1 && 'rn-section-gapTop', className)}>
    <div className="">
      <div className="row g-5">
        {items && items.length > 0 ? (
          <>
            {items.map((item: ItemType) => (
              <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <Item
                  title={item.name}
                  owner={item.owner}
                  itemId={item.itemId}
                  tokenId={item.tokenId}
                  price={Number(item.price)}
                  tags={item.tags}
                  latestBid=""
                  likeCount={item.likes}
                  imageString={item.image.url}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="text-center">
            <h3>No Item to show</h3>
            <h4 style={{ color: '#35b049' }}>
              <u>Please try searching with other values</u>
            </h4>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ProductArea;
