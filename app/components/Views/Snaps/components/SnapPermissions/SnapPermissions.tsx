import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../../../util/theme';
import Text, {
  TextVariant,
} from '../../../../../component-library/components/Texts/Text';
import { SnapPermissions as SnapPermissionsType } from '@metamask/snaps-utils';
import { createStyles } from './styles';
import { toDateFormat } from '../../../../../util/date';
import {
  SNAP_PERMISSIONS,
  SNAP_PERMISSIONS_DATE,
  SNAP_PERMISSIONS_TITLE,
  SNAP_PERMISSION_CELL,
} from '../../../../../constants/test-ids';
import { strings } from '../../../../../../locales/i18n';
import Icon, {
  IconColor,
  IconName,
  IconSize,
} from '../../../../../component-library/components/Icons/Icon';
import Card from '../../../../../component-library/components/Cards/Card';

interface SnapPermissionsProps {
  permissions: SnapPermissionsType;
  installedAt: number;
}

const SnapPermissions = ({
  permissions,
  installedAt,
}: SnapPermissionsProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const snapInstalledDate: string = useMemo(
    () =>
      strings('app_settings.snaps.snap_permissions.approved_date', {
        date: toDateFormat(installedAt),
      }),
    [installedAt],
  );

  const derivePermissionsTitles = (permissionsList: SnapPermissionsType) => {
    const rpcPermission = 'endowment:rpc';

    const permissionsStrings: string[] = [];

    for (const key in permissionsList) {
      if (key === rpcPermission && typeof permissionsList[key] === 'object') {
        const rpcPermissions = permissionsList[key] as {
          [key: string]: boolean | undefined;
        };
        for (const rpcKey in rpcPermissions) {
          if (rpcPermissions[rpcKey] === true) {
            const title = strings(
              `app_settings.snaps.snap_permissions.human_readable_permission_titles.endowment:rpc.${rpcKey}`,
            );
            permissionsStrings.push(title);
          }
        }
      } else {
        const title = strings(
          `app_settings.snaps.snap_permissions.human_readable_permission_titles.${key}`,
        );
        permissionsStrings.push(title);
      }
    }

    return permissionsStrings;
  };

  const permissionsToRender = derivePermissionsTitles(permissions);

  const renderPermissionCell = (
    title: string,
    secondaryText: string,
    key: number,
  ) => (
    <Card key={key} style={styles.permissionCell}>
      <View testID={SNAP_PERMISSION_CELL} style={styles.cellBase}>
        <Icon
          style={styles.icon}
          name={IconName.Key}
          size={IconSize.Md}
          color={IconColor.Muted}
        />
        <View style={styles.cellBaseInfo}>
          <Text
            testID={SNAP_PERMISSIONS_TITLE}
            numberOfLines={2}
            variant={TextVariant.HeadingSMRegular}
          >
            {title}
          </Text>
          <Text
            testID={SNAP_PERMISSIONS_DATE}
            numberOfLines={1}
            variant={TextVariant.BodyMD}
            style={styles.secondaryText}
          >
            {secondaryText}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View testID={SNAP_PERMISSIONS} style={styles.section}>
      <Text variant={TextVariant.HeadingMD}>
        {strings(
          'app_settings.snaps.snap_permissions.permission_section_title',
        )}
      </Text>
      {permissionsToRender.map((item, key) =>
        renderPermissionCell(item, snapInstalledDate, key),
      )}
    </View>
  );
};

export default React.memo(SnapPermissions);
