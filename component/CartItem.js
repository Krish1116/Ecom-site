import { useProductCart } from "./CartProvider";
import productItem from "./Data/item.json";
import marchItem from "./Data/MarchItem.json";
import { Button, Stack } from "react-bootstrap";
import { formatRs } from "../component/utilities/FormateCurrency";

export function CartItem({ id, quantity }) {
  const { removeFromCart } = useProductCart();
  const item =
    productItem.find((i) => i.id === id) || marchItem.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imageUrl}
          style={{ width: "120px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.title}
            {quantity > 1 && <span className="text-muted"> x{quantity}</span>}
          </div>
          <div className="text-muted">{formatRs(item.price)}</div>
        </div>
        <div> {formatRs(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
}
