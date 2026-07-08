import { useState, type ReactNode } from "react";
import { Alert, StyleSheet, View } from "react-native";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  EmptyState,
  IconButton,
  Image,
  Input,
  Screen,
  Select,
  Sheet,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
} from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import type { ThemeColors } from "@/lib/theme";
import { useDialogStore } from "@/stores/dialog-store";
import { useToastStore } from "@/stores/toast-store";

type ShowcaseSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function ShowcaseSection({
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  const { spacing } = useTheme();

  return (
    <View style={{ marginTop: spacing.lg, width: "100%" }}>
      <Text variant="label">{title}</Text>
      {description ? (
        <Text style={{ marginTop: spacing.xs }} variant="muted">
          {description}
        </Text>
      ) : null}
      <View style={{ marginTop: spacing.sm }}>{children}</View>
    </View>
  );
}

function ColorSwatchInline({ name, value }: { name: string; value: string }) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View style={styles.colorItem}>
      <View
        style={[
          styles.colorBox,
          {
            backgroundColor: value,
            borderColor: colors.border,
            borderRadius: radius.md,
          },
        ]}
      />
      <Text style={{ marginTop: spacing.xs }} variant="label">
        {name}
      </Text>
      <Text variant="muted">{value}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { colors, isDark, spacing } = useTheme();
  const showToast = useToastStore((state) => state.show);
  const alert = useDialogStore((state) => state.alert);
  const confirm = useDialogStore((state) => state.confirm);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedChip, setSelectedChip] = useState("Design");
  const [agreed, setAgreed] = useState(false);
  const [city, setCity] = useState<string | undefined>("ulaanbaatar");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const cityOptions = [
    { label: "Улаанбаатар", value: "ulaanbaatar" },
    { label: "Дархан", value: "darkhan" },
    { label: "Эрдэнэт", value: "erdenet" },
    { label: "Ховд", value: "hovd" },
  ];

  function handlePress() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast("Агуулга шинэчлэгдлээ");
    }, 1000);
  }

  async function handleWarningAlert() {
    await alert({
      title: "Анхаар!",
      message: "Таны сесс 5 минутын дараа дуусна.",
      variant: "warning",
    });
  }

  async function handleDeleteDemo() {
    const confirmed = await confirm({
      title: "Зүйл устгах уу?",
      message: "Энэ үйлдлийг буцаах боломжгүй.",
      confirmLabel: "Устгах",
      variant: "error",
    });

    if (confirmed) {
      showToast("Зүйл устгагдлаа", "error");
    }
  }

  return (
    <Screen onRefresh={handleRefresh} refreshing={refreshing} scroll>
      <Text variant="title">UI Showcase</Text>
      <Text style={{ marginTop: spacing.xs }} variant="muted">
        Pull down to refresh. All template components in one place.
      </Text>

      <ShowcaseSection description="default, success, error." title="Toast">
        <Card style={{ gap: spacing.sm }}>
          <Button
            onPress={() => showToast("Профайл шинэчлэгдлээ")}
            title="Default toast"
          />
          <Button
            onPress={() =>
              showToast({
                message: "Өөрчлөлтүүд хадгалагдлаа",
                variant: "success",
              })
            }
            title="Success toast"
            variant="ghost"
          />
          <Button
            onPress={() =>
              showToast({
                message: "Ямар нэг зүйл буруу боллоо",
                variant: "error",
              })
            }
            title="Error toast"
            variant="ghost"
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="alert() — 1 товч, confirm() — 2 товч."
        title="Цонх"
      >
        <Card style={{ gap: spacing.sm }}>
          <Button
            onPress={() =>
              void alert({
                title: "Амжилттай хадгалагдлаа",
                message: "Таны өөрчлөлтүүд амжилттай хадгалагдлаа.",
                variant: "success",
              })
            }
            title="Амжилттай alert"
          />
          <Button
            onPress={handleWarningAlert}
            title="Анхааруулга alert"
            variant="secondary"
          />
          <Button
            onPress={handleDeleteDemo}
            title="Алдаа confirm"
            variant="danger"
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Active palette from theme.ts — updates with system light/dark."
        title="Colors"
      >
        <Card>
          <Badge
            label={isDark ? "Dark mode" : "Light mode"}
            variant={isDark ? "primary" : "default"}
          />
          <View
            style={[
              styles.colorGrid,
              { gap: spacing.sm, marginTop: spacing.md },
            ]}
          >
            {(Object.entries(colors) as [keyof ThemeColors, string][]).map(
              ([name, value]) => (
                <ColorSwatchInline key={name} name={name} value={value} />
              ),
            )}
          </View>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Title, body, muted, and label styles."
        title="Typography"
      >
        <Card>
          <Text variant="title">Title</Text>
          <Text style={{ marginTop: spacing.xs }} variant="body">
            Body text for paragraphs and content.
          </Text>
          <Text style={{ marginTop: spacing.xs }} variant="muted">
            Muted text for secondary information.
          </Text>
          <Text style={{ marginTop: spacing.xs }} variant="label">
            Label text for fields and sections.
          </Text>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Primary, secondary, ghost, danger, loading, and icon buttons."
        title="Buttons"
      >
        <Card style={{ gap: spacing.sm }}>
          <Button loading={loading} onPress={handlePress} title="Continue" />
          <Button
            onPress={() => setEmail("")}
            title="Secondary"
            variant="secondary"
          />
          <Button onPress={() => setEmail("")} title="Clear" variant="ghost" />
          <Button
            onPress={() => Alert.alert("Deleted")}
            title="Delete"
            variant="danger"
          />
          <View style={[styles.row, { gap: spacing.sm }]}>
            <IconButton
              name="heart-outline"
              onPress={() => Alert.alert("Liked")}
            />
            <IconButton name="share-outline" variant="ghost" />
            <IconButton name="trash-outline" variant="danger" />
          </View>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Single-line and multiline fields."
        title="Inputs"
      >
        <Card style={{ gap: spacing.md }}>
          <Input
            autoCapitalize="none"
            error={
              email.length > 0 && !email.includes("@")
                ? "Invalid email"
                : undefined
            }
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="you@example.com"
            value={email}
          />
          <Textarea
            label="Notes"
            onChangeText={setNotes}
            placeholder="Write something..."
            value={notes}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection description="Status pills." title="Badges">
        <Card>
          <View style={[styles.row, { gap: spacing.sm }]}>
            <Badge label="Default" />
            <Badge label="Primary" variant="primary" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Danger" variant="danger" />
          </View>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection description="Selectable filter chips." title="Chips">
        <Card>
          <View style={[styles.row, { gap: spacing.sm }]}>
            {["Design", "Engineering", "Marketing"].map((chip) => (
              <Chip
                key={chip}
                label={chip}
                onPress={() => setSelectedChip(chip)}
                selected={selectedChip === chip}
              />
            ))}
          </View>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection description="Initials in three sizes." title="Avatars">
        <Card>
          <View style={[styles.row, { gap: spacing.md }]}>
            <Avatar name="Enkh Amgalan" size="sm" />
            <Avatar name="Native Template" size="md" />
            <Avatar name="UI Kit" size="lg" />
          </View>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection description="Themed native switch." title="Switch">
        <Card>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text variant="body">Notifications</Text>
              <Text style={{ marginTop: spacing.xs }} variant="muted">
                Receive push notifications
              </Text>
            </View>
            <Switch onValueChange={setNotifications} value={notifications} />
          </View>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Loading and placeholder states."
        title="Feedback"
      >
        <Card style={{ gap: spacing.md }}>
          <Spinner label="Loading content..." size="large" />
          <Skeleton height={14} width="80%" />
          <Skeleton height={14} width="60%" />
          <View style={[styles.row, { gap: spacing.sm }]}>
            <Skeleton circle height={40} width={40} />
            <View style={{ flex: 1, gap: spacing.xs }}>
              <Skeleton height={12} width="70%" />
              <Skeleton height={12} width="45%" />
            </View>
          </View>
          <EmptyState
            actionLabel="Try again"
            description="No items yet. Create your first one."
            onAction={() => Alert.alert("Retry")}
            title="Nothing here"
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection description="Section separators." title="Divider">
        <Card>
          <Text variant="body">Content above</Text>
          <Divider />
          <Text variant="body">Content below</Text>
          <Divider label="or" />
          <Text variant="muted">More content</Text>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="expo-image wrapper with themed radius."
        title="Image"
      >
        <Card>
          <Image
            source={{ uri: "https://picsum.photos/800/480" }}
            style={{ height: 180 }}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection description="Boolean field with label." title="Checkbox">
        <Card>
          <Checkbox
            checked={agreed}
            label="Үйлчилгээний нөхцөлийг зөвшөөрч байна"
            onCheckedChange={setAgreed}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Mobile picker via bottom sheet."
        title="Select"
      >
        <Card>
          <Select
            label="Хот"
            onValueChange={setCity}
            options={cityOptions}
            placeholder="Хот сонгох"
            value={city}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Slide-up panel for actions or custom content."
        title="Sheet"
      >
        <Card style={{ gap: spacing.sm }}>
          <Button onPress={() => setSheetOpen(true)} title="Open sheet" />
          <Sheet
            onClose={() => setSheetOpen(false)}
            title="Үйлдэл сонгох"
            visible={sheetOpen}
          >
            <View style={{ gap: spacing.sm }}>
              <Button
                onPress={() => setSheetOpen(false)}
                title="Засах"
                variant="ghost"
              />
              <Button
                onPress={() => setSheetOpen(false)}
                title="Хуваалцах"
                variant="secondary"
              />
              <Button
                onPress={() => setSheetOpen(false)}
                title="Устгах"
                variant="danger"
              />
            </View>
          </Sheet>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="In-screen tabs with tab content panels."
        title="Tabs"
      >
        <Tabs onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="all">Бүгд</TabsTrigger>
            <TabsTrigger value="active">Идэвхтэй</TabsTrigger>
            <TabsTrigger value="done">Дууссан</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Text variant="body">Бүх зүйлсийн жагсаалт энд харагдана.</Text>
          </TabsContent>
          <TabsContent value="active">
            <Text variant="body">Идэвхтэй зүйлс энд харагдана.</Text>
          </TabsContent>
          <TabsContent value="done">
            <Text variant="body">Дууссан зүйлс энд харагдана.</Text>
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection
        description="Expandable FAQ-style sections."
        title="Accordion"
      >
        <Accordion defaultValue={["shipping"]}>
          <AccordionItem title="Хүргэлт хэд хоногт ирдэг вэ?" value="shipping">
            <Text variant="muted">Ихэнх захиалга 2-4 хоногт хүрдэг.</Text>
          </AccordionItem>
          <AccordionItem title="Буцаалт хийх боломжтой юу?" value="returns">
            <Text variant="muted">
              14 хоногийн дотор буцаалт хийх боломжтой.
            </Text>
          </AccordionItem>
          <AccordionItem title="Төлбөрийн хэрэгслүүд" value="payments">
            <Text variant="muted">Карт, QPay, банкны шилжүүлэг.</Text>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>

      <View style={{ height: spacing.xl }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  colorBox: {
    borderWidth: 1,
    height: 56,
    width: "100%",
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  colorItem: {
    marginBottom: 12,
    width: "48%",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});
