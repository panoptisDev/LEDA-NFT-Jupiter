import { Item, Property, Tag } from '@types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import BoyAvatar from '../../../../public/images/icons/boy-avater.png';
import { TabsDetails } from '../../../common/enums/nft-details-tabs.enum';
import {
  selectCanIDelist,
  selectCanIList,
} from '../../../features/marketplace/store/marketplace.slice';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { DelistingTabContent } from './delisting-tab-content';
import DetailsTabContent from './details-tab-content';
import { HistoryTabContent } from './history-tab-content';
import { ListingTabContent } from './listing-tab-content';

type Props = {
  className?: string;
};

const propertiesHard: Property[] = [
  {
    id: 1,
    type: 'Hype Type',
    value: 'CALM AF (STILL)',
  },
  {
    id: 2,
    type: 'BASTARDNESS',
    value: 'C00LIO BASTARD',
  },
  {
    id: 3,
    type: 'TYPE',
    value: 'APE',
  },
  {
    id: 4,
    type: 'ASTARDNESS',
    value: 'BASTARD',
  },
  {
    id: 5,
    type: 'BID',
    value: 'BPEYti',
  },
];

const ownerHard: any = [
  {
    name: 'Jhon Slet',
    slug: 'h',
    image: {
      src: BoyAvatar,
    },
  },
];

export const BidTab = ({ className }: Props) => {
  const {
    isCompleted: isListed,
    isLoading,
    selectedItem,
  } = useAppSelector((state) => state.marketplace);
  const canIList = useAppSelector((state) => selectCanIList(state, selectedItem));
  const canIDelist = useAppSelector((state) => selectCanIDelist(state, selectedItem));
  const [selectedTab, setSelectedTab] = useState(TabsDetails.details as string);

  useEffect(() => {
    if (isListed && !isLoading) {
      setSelectedTab(TabsDetails.details);
    }
  }, [isListed, isLoading]);

  return (
    <TabContainer
      defaultActiveKey="/nav-history"
      activeKey={selectedTab}
      onSelect={(selected) => setSelectedTab(String(selected))}
    >
      <div className={clsx('tab-wrapper-one', className)}>
        <nav className="tab-button-one">
          <Nav as="div" defaultActiveKey="/nav-history" className="nav-tabs">
            <Nav.Item>
              <Nav.Link as="button" eventKey="nav-details" href="/nav-details">
                Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="button" eventKey="nav-history" href="/nav-history">
                History
              </Nav.Link>
            </Nav.Item>
            {canIList && (
              <Nav.Item>
                <Nav.Link as="button" eventKey="nav-list" href="/nav-list">
                  List
                </Nav.Link>
              </Nav.Item>
            )}
            {canIDelist && (
              <Nav.Link as="button" eventKey="nav-delist">
                Delist
              </Nav.Link>
            )}
          </Nav>
        </nav>
        <TabContent className="rn-bid-content">
          <TabPane eventKey="nav-details">
            <DetailsTabContent
              owner={ownerHard}
              properties={propertiesHard}
              tags={selectedItem.tags}
            />
          </TabPane>
          <TabPane eventKey="nav-history">
            <HistoryTabContent />
          </TabPane>
          {canIList && (
            <TabPane eventKey="nav-list">
              <ListingTabContent />
            </TabPane>
          )}

          {canIDelist && (
            <TabPane eventKey="nav-delist">
              <DelistingTabContent />
            </TabPane>
          )}
        </TabContent>
      </div>
    </TabContainer>
  );
};
